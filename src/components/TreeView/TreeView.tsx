'use client';

import React, { useState, ReactNode } from 'react';
import { BaseProps } from '../../types';

export interface TreeNode {
  id: string;
  label: string;
  icon?: ReactNode;
  children?: TreeNode[];
}

export interface TreeViewProps extends BaseProps {
  nodes: TreeNode[];
  /** Initially expanded node ids */
  defaultExpanded?: string[];
  /** Currently selected node id */
  selected?: string;
  onSelect?: (node: TreeNode) => void;
}

function TreeItem({
  node,
  depth,
  expanded,
  toggleExpand,
  selected,
  onSelect,
}: {
  node: TreeNode;
  depth: number;
  expanded: Set<string>;
  toggleExpand: (id: string) => void;
  selected?: string;
  onSelect?: (node: TreeNode) => void;
}) {
  const hasChildren = !!node.children?.length;
  const isOpen = expanded.has(node.id);
  const isSelected = selected === node.id;

  return (
    <div>
      <div
        onClick={() => { onSelect?.(node); if (hasChildren) toggleExpand(node.id); }}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.35rem 0.5rem', paddingLeft: `${0.5 + depth * 1.1}rem`,
          borderRadius: 6, cursor: 'pointer', fontSize: '0.83rem',
          background: isSelected ? 'var(--lux-surface-1)' : 'transparent',
          color: isSelected ? 'var(--lux-primary)' : 'inherit',
          fontWeight: isSelected ? 600 : 400,
        }}
      >
        {hasChildren ? (
          <span style={{ fontSize: '0.65rem', opacity: 0.5, transform: isOpen ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.15s', width: 10, display: 'inline-block' }}>▸</span>
        ) : (
          <span style={{ width: 10, display: 'inline-block' }} />
        )}
        {node.icon && <span style={{ fontSize: '0.85em' }}>{node.icon}</span>}
        <span>{node.label}</span>
      </div>
      {hasChildren && isOpen && (
        <div>
          {node.children!.map(child => (
            <TreeItem key={child.id} node={child} depth={depth + 1} expanded={expanded} toggleExpand={toggleExpand} selected={selected} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeView({ nodes, defaultExpanded = [], selected, onSelect, className, style }: TreeViewProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpanded));

  const toggleExpand = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className={className} style={style}>
      {nodes.map(node => (
        <TreeItem key={node.id} node={node} depth={0} expanded={expanded} toggleExpand={toggleExpand} selected={selected} onSelect={onSelect} />
      ))}
    </div>
  );
}
