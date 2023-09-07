import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import ColorSelectorNode from './Nodes/Block';

// const initBgColor = '#1A192B';

const snapGrid = [5, 5];
const nodeTypes = {
  selectorNode: ColorSelectorNode,
};

const CustomNodeFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);


  useEffect(() => {

    setNodes([
      {
        id: '1',
        type: 'default',
        data: { label: 'util/git-clone' },
        position: { x: 0, y: 50 },
        sourcePosition: 'right',
        targetPosition: 'left',
      },
      {
        id: '2',
        type: 'default',
        data: { label: 'util/git-status-check' },
        position: { x: 200, y: 0 },
        sourcePosition: 'right',
        targetPosition: 'left',
      },
      {
        id: '3',
        type: 'default',
        data: { label: 'onboarding/validate' },
        position: { x: 200, y: 50 },
        sourcePosition: 'right',
        targetPosition: 'left',
      },
      {
        id: '4',
        type: 'default',
        data: { label: 'util/git-status-check' },
        position: { x: 400, y: 50 },
        sourcePosition: 'right',
        targetPosition: 'left',
      },
    ]);

    setEdges([
      {
        id: 'e1-2',
        source: '2',
        target: '4',
        markerEnd: {
          type: MarkerType.Arrow,
        },
      },
      {
        id: 'e2a-3',
        source: '1',
        target: '3',
        sourceHandle: 'a',
        markerEnd: {
          type: MarkerType.Arrow,
        },
      },
      {
        id: 'e2b-4',
        source: '3',
        target: '4',
        sourceHandle: 'a',
        markerEnd: {
          type: MarkerType.Arrow,
        },
      },
    ]);
  }, []);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
    []
  );
  return (
    <div className='workflow'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodeClick={(_, node) => console.log(node)}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        // defaultZoom={1.5}
        style={{
          backgroundColor: "#fafafb",
        }}
        fitView
        attributionPosition="bottom-left"
      >
        <Background color="#b8b8bf" variant="dots" />
        <MiniMap
        />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default CustomNodeFlow;
