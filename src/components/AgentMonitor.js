/**
 * AgentMonitor Component - Real-time monitoring of agent processing
 * Connects to WebSocket endpoint for live updates
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import apiService from '../services/api';

const AgentMonitor = ({ executionId, onComplete, onError }) => {
  const [status, setStatus] = useState({
    execution_id: executionId,
    status: 'connecting',
    progress: 0,
    current_step: 'Initializing',
    agent_status: {},
    logs: [],
    message: 'Connecting to monitoring service...'
  });

  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const maxReconnectAttempts = 5;

  // Agent configuration matching backend
  const agentConfig = {
    draft_refiner: {
      name: 'Draft Refiner',
      description: 'Analyzes and refines user draft content',
      icon: '✏️',
      color: 'blue'
    },
    web_researcher: {
      name: 'Web Researcher',
      description: 'Searches for relevant academic sources',
      icon: '🔍',
      color: 'green'
    },
    content_writer: {
      name: 'Content Writer',
      description: 'Generates paper sections and content',
      icon: '✍️',
      color: 'purple'
    },
    format_enforcer: {
      name: 'Format Enforcer',
      description: 'Ensures IEEE format compliance',
      icon: '📋',
      color: 'yellow'
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleReconnect = useCallback(() => {
    if (reconnectAttempts >= maxReconnectAttempts) {
      setConnectionStatus('failed');
      return;
    }

    clearTimeout(reconnectTimeoutRef.current);
    reconnectTimeoutRef.current = setTimeout(() => {
      setReconnectAttempts(prev => prev + 1);
      connectWebSocket();
    }, Math.min(1000 * Math.pow(2, reconnectAttempts), 10000)); // Exponential backoff
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reconnectAttempts, maxReconnectAttempts]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const connectWebSocket = useCallback(() => {
    if (!executionId) return;

    try {
      setConnectionStatus('connecting');
      
      wsRef.current = apiService.connectWebSocket(
        executionId,
        // onMessage
        (data) => {
          console.log('WebSocket message received:', data);
          setStatus(prevStatus => ({
            ...prevStatus,
            ...data,
            timestamp: new Date().toISOString()
          }));

          if (data.status === 'completed') {
            setConnectionStatus('completed');
            if (onComplete) onComplete(data);
          } else if (data.status === 'failed') {
            setConnectionStatus('failed');
            if (onError) onError(new Error(data.error || 'Processing failed'));
          }

          // Reset reconnect attempts on successful message
          setReconnectAttempts(0);
        },
        // onError
        (error) => {
          console.error('WebSocket error:', error);
          setConnectionStatus('error');
          handleReconnect();
        },
        // onClose
        (event) => {
          console.log('WebSocket closed:', event);
          if (event.code !== 1000 && reconnectAttempts < maxReconnectAttempts) {
            setConnectionStatus('reconnecting');
            handleReconnect();
          } else {
            setConnectionStatus('disconnected');
          }
        }
      );

      // Connection opened successfully
      if (wsRef.current) {
        setConnectionStatus('connected');
      }

    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      setConnectionStatus('error');
      handleReconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executionId, onComplete, onError, reconnectAttempts, maxReconnectAttempts]);

  useEffect(() => {
    if (executionId) {
      connectWebSocket();
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close(1000, 'Component unmounting');
      }
      clearTimeout(reconnectTimeoutRef.current);
    };
  }, [executionId, connectWebSocket]);

  const getStatusColor = (agentStatus) => {
    switch (agentStatus) {
      case 'running': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'skipped': return 'bg-gray-500';
      default: return 'bg-gray-300';
    }
  };

  const getConnectionStatusIndicator = () => {
    const indicators = {
      connecting: { color: 'bg-yellow-500', text: 'Connecting', pulse: true },
      connected: { color: 'bg-green-500', text: 'Connected', pulse: false },
      reconnecting: { color: 'bg-orange-500', text: 'Reconnecting', pulse: true },
      error: { color: 'bg-red-500', text: 'Connection Error', pulse: false },
      disconnected: { color: 'bg-gray-500', text: 'Disconnected', pulse: false },
      completed: { color: 'bg-blue-500', text: 'Completed', pulse: false },
      failed: { color: 'bg-red-500', text: 'Failed', pulse: false }
    };

    const indicator = indicators[connectionStatus] || indicators.disconnected;

    return (
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${indicator.color} ${indicator.pulse ? 'animate-pulse' : ''}`}></div>
        <span className="text-sm text-gray-600">{indicator.text}</span>
        {reconnectAttempts > 0 && (
          <span className="text-xs text-gray-500">
            (Attempt {reconnectAttempts}/{maxReconnectAttempts})
          </span>
        )}
      </div>
    );
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Agent Processing Monitor</h3>
          <p className="text-sm text-gray-500">Execution ID: {executionId}</p>
        </div>
        {getConnectionStatusIndicator()}
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm text-gray-500">{status.progress || 0}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${status.progress || 0}%` }}
          ></div>
        </div>
        {status.message && (
          <p className="mt-2 text-sm text-gray-600">{status.message}</p>
        )}
      </div>

      {/* Agent Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {Object.entries(agentConfig).map(([agentKey, agent]) => {
          const agentStatus = status.agent_status?.[agentKey] || 'idle';
          const isActive = agentStatus === 'running';

          return (
            <div
              key={agentKey}
              className={`border rounded-lg p-4 transition-all duration-300 ${
                isActive ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{agent.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{agent.name}</h4>
                    <p className="text-sm text-gray-500">{agent.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(agentStatus)}`}></div>
                  <span className={`text-sm capitalize ${isActive ? 'font-medium' : ''}`}>
                    {agentStatus}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Processing Logs */}
      {status.logs && status.logs.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Processing Logs</h4>
          <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
            <div className="space-y-2">
              {status.logs.slice(-10).map((log, index) => (
                <div key={index} className="text-sm">
                  <span className="text-gray-500 font-mono">
                    {formatTimestamp(log.timestamp)}
                  </span>
                  <span className="ml-2 text-gray-700">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {status.status === 'failed' && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Processing Failed</h3>
              <p className="mt-1 text-sm text-red-700">
                {status.error || 'An unknown error occurred during processing.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success Display */}
      {status.status === 'completed' && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex">
            <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Processing Completed</h3>
              <p className="mt-1 text-sm text-green-700">
                Your research paper has been generated successfully and is ready for download.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentMonitor;
