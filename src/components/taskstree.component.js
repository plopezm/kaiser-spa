import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Icon } from 'antd';
const TreeNode = Tree.TreeNode;

const TaskTreeComponent = (props) => {
    const entrypoint = props.entrypoint;
    const taskMap = props.tasks.toHashMap('name');

    const renderNextNodes = (taskMap, currentTask, nodeName) => {
        if (!currentTask || !currentTask[nodeName]) {
            return "";
        }
        const nextTaskName = currentTask[nodeName];
        return (
                <TreeNode key={nextTaskName} title={nextTaskName} icon={<Icon type={nodeName === 'onSuccess' ? 'check-circle-o' : 'close-circle' } />} >
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
                defaultSelectedKeys={[entrypoint]}
                onSelect={props.onSelect}
            >
                <TreeNode key={entrypoint} title={entrypoint} icon={<Icon type="login" />}>
                    {renderNextNodes(taskMap, initialTask, 'onSuccess')}
                    {renderNextNodes(taskMap, initialTask, 'onFailure')}
                </TreeNode>
            </Tree>
        </React.Fragment>
    )
};

TaskTreeComponent.propTypes = {
    tasks: PropTypes.array.isRequired,
    entrypoint: PropTypes.string.isRequired,
    onSelect: PropTypes.func
}

TaskTreeComponent.defaultProps = {
    onSelect: () => {}
}

export default TaskTreeComponent;