import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Icon } from 'antd';
const TreeNode = Tree.TreeNode;

const TaskTreeComponent = (props) => {
    const entrypoint = props.entrypoint;
    if (!entrypoint || entrypoint === "") {
        return "";
    }
    const taskMap = props.tasks.toHashMap('name');

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const renderNextNodes = (taskMap, currentTask, nodeName) => {
        if (!currentTask[nodeName]) {
            return "";
        }
        const nextTaskName = currentTask[nodeName];
        return (
                <TreeNode title={nextTaskName} icon={<Icon type={nodeName === 'onSuccess' ? 'check-circle-o' : 'close-circle' } />} >
                    {renderNextNodes(taskMap, taskMap[nextTaskName], 'onSuccess')}
                    {renderNextNodes(taskMap, taskMap[nextTaskName], 'onFailure')}
                </TreeNode>
        );
    }

    const initialTask = taskMap[entrypoint]

    return (
        <React.Fragment>
            <Tree
                showLine
                showIcon
                defaultExpandAll
                onSelect={onSelect}
            >
                <TreeNode title={entrypoint} icon={<Icon type="login" />}>
                    {renderNextNodes(taskMap, initialTask, 'onSuccess')}
                    {renderNextNodes(taskMap, initialTask, 'onFailure')}
                </TreeNode>
            </Tree>
        </React.Fragment>
    )
};

TaskTreeComponent.propTypes = {
    tasks: PropTypes.array.isRequired,
    entrypoint: PropTypes.string,
    isRoot: PropTypes.bool
}

TaskTreeComponent.defaultProps = {
    isRoot: false
}

export default TaskTreeComponent;