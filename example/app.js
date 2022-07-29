import React, {Fragment, PureComponent} from 'react';
import ReactDOM from 'react-dom';
import {forEach, includes} from 'lodash';

import {Treebeard, decorators} from '../src';
import {Div} from '../src/components/common';
import data from './data';
import styles from './styles';
import * as filters from './filter';
import Header from './Header';
import NodeViewer from './NodeViewer';

import { getDepth, removeNode, randomString } from '../src/util/index';

class DemoTree extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {data};
        this.onToggle = this.onToggle.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
    }

    onToggle(node, toggled) {
        const {cursor, data} = this.state;

        // this.setState(() => {});
        node.toggled = true;

        console.log('Hello onToggle...', arguments);

        /* if (cursor) {
            this.setState(() => ({cursor, active: false}));
        }

        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }

        this.setState(() => ({cursor: node, data: Object.assign({}, data)})); */
    }

    onSelect(node) {
        const {cursor, data} = this.state;

        if (cursor) {
            this.setState(() => ({cursor, active: false}));
            if (!includes(cursor.children, node)) {
                cursor.toggled = false;
                cursor.selected = false;
            }
        }

        node.selected = true;

        this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
    }

    onFilterMouseUp({target: {value}}) {
        const filter = value.trim();
        if (!filter) {
            return this.setState(() => ({data}));
        }
        let filtered = filters.filterTree(data, filter);
        filtered = filters.expandFilteredNodes(filtered, filter);
        this.setState(() => ({data: filtered}));
    }

    handleRemoveItem(eTarget, node, treeIndex, path) {
        console.log('Called actionHandler => ', node, arguments, eTarget);
        const { data } = this.state;
        const { children } = data;
        if(path.length <= 2) {
            children.splice(treeIndex, 1);
            if(children.length == 0)
                children.toggled = false;
            // this.setState(()=>({...data, children}));
        } else {
            if(path.length == 3) {
                // children.splice(treeIndex, 1);
                children[path[1]].children.splice(treeIndex, 1);
                if(children[path[1]].children.length == 0)
                    children[path[1]].toggled = false;
            } else if(path.length == 4) {
                children[path[1]].children[path[2]].children.splice(treeIndex, 1);
                if(children[path[1]].children[path[2]].children.length == 0)
                    children[path[1]].children[path[2]].toggled = false;
            } else if(path.length == 5) {
                children[path[1]].children[path[2]].children[path[3]].children.splice(treeIndex, 1);
                if(children[path[1]].children[path[2]].children[path[3]].children.length == 0)
                    children[path[1]].children[path[2]].children[path[3]].toggled = false;
            }
            this.setState(()=>({...data, children}));
        }
        console.log('data => ', data);
    }

    handleAddItem(node) {
        console.log('Called handleAddItem => ', arguments, node);
        const { data } = this.state;
        const { children } = data;
        children.splice(0, 0, {name: 'My New Item - ' + randomString(), id: randomString()});
        this.setState(()=>({...data, children}));
    }

    render() {
        const {data, cursor} = this.state;
        return (
            <Fragment>
                <Div style={styles.searchBox}>
                    <Div className="input-group">
                        <span className="input-group-addon">
                            <i className="fa fa-search"/>
                        </span>
                        <input
                            className="form-control"
                            onKeyUp={this.onFilterMouseUp.bind(this)}
                            placeholder="Search the tree..."
                            type="text"
                        />
                    </Div>
                </Div>
                
                <Div style={styles.component}>
                    <Treebeard
                        data={data}
                        onToggle={this.onToggle}
                        onSelect={this.onSelect}
                        decorators={{...decorators, Header}}
                        customStyles={{
                            header: {
                                title: {
                                    color: 'red'
                                }
                            }
                        }}
                        actionHandler={this.handleRemoveItem}
                        onChange={(data) => {
                            this.setState(() => ({...data}));
                        }}
                    />

                    <hr />
                    
                    <Div>
                        <button onClick={this.handleAddItem}>Add Node</button>
                    </Div>
                </Div>


                <Div style={styles.component}>
                    <NodeViewer node={cursor}/>
                </Div>
            </Fragment>
        );
    }
}

const content = document.getElementById('content');
ReactDOM.render(<DemoTree/>, content);
