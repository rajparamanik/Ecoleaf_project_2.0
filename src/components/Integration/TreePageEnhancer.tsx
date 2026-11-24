import React from 'react';
import CommentSystem from '../Comments/CommentSystem';
import LikeButton from '../Social/LikeButton';
import ShareButtons from '../Social/ShareButtons';
import './TreePageEnhancer.css';

type TreePageEnhancerProps = {
  treeId: string;
  treeName: string;
  description: string;
};

// This component can be added to each tree info page to add social features
const TreePageEnhancer: React.FC<TreePageEnhancerProps> = ({ treeId, treeName, description }) => {
  return (
    <div className="tree-page-social">
      <div className="social-engagement">
        <LikeButton postId={treeId} postType="tree" />
        <ShareButtons 
          url={`/trees/${treeId}`} 
          title={`Learn about ${treeName}`} 
          summary={description.substring(0, 100) + '...'}
        />
      </div>
      <CommentSystem postId={treeId} postType="tree" />
    </div>
  );
};

export default TreePageEnhancer;