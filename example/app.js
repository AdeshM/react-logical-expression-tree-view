import React, {Fragment, PureComponent} from 'react';
import ReactDOM from 'react-dom';
import _, {includes} from 'lodash';

import {Treebeard, decorators} from '../src';
import {Div} from '../src/components/common';
import data from './data';
import styles from './styles';
import * as filters from './filter';
import Header from './Header';
import NodeViewer from './NodeViewer';

import { randomString } from '../src/util/index';


import { JSONPath } from 'jsonpath-plus';


class DemoTree extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {data};
        this.onToggle = this.onToggle.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.onSelectConnector = this.onSelectConnector.bind(this);
        this.currentPath = [0];
        this.currentIndex = 0;
        this.collector = [];
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

    onSelect(node, path) {
        const {cursor, data} = this.state;

        if (cursor) {
            this.setState(() => ({cursor, active: false}));
            if (!includes(cursor.children, node)) {
                cursor.toggled = false;
                cursor.selected = false;
            }
        }

        node.selected = true;

        const placeholder = {
            name: 'My Placeholder',
            loading: true,
            children: [{name: 'XYZ W'}, {name: 'Test 2'}],
            operator: 'OR',
            toggled: true,
        };
        const res = /* ''; // */(_.set(data, 'children', [...data.children, placeholder]));

        console.log('Now insert -> ', node, ' @path => ', path, res);

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

    handleRemoveItem(e, node, treeIndex, path) {
        console.log('Called actionHandler => ', node, arguments, e);
        const { data } = this.state;
        const { children } = data;
        e.stopPropagation();
        // e.nativeEvent.stopImmediatePropagation();
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
        }
        this.setState(()=>({...data, children}));
        console.log('data => ', data);
    }

    handleAddItem(node) {
        console.log('Called handleAddItem => ', arguments, node);
        const { data } = this.state;
        const { children } = data;
        // children.splice(0, 0, {name: 'My New Item - ' + randomString(), id: randomString()});
        // this.setState(()=>({...data, children}));
        /* this.setState((prevState)=> (
            {...data, children}
        )); */
        /* this.setState((prevState, props) => {
            prevState.data.children.splice(0, 0, {name: 'My New Item - ' + randomString(), id: randomString()});
            prevState.data.children;
        }); */
        this.setState(function(previousState) {
            previousState.data.children.splice(0, 0, {name: 'My New Item - ' + randomString(), id: randomString()});
            return {
                ...previousState,
                // data: previousState.data
            };
        });
    }

    onSelectConnector(node, path) {
        console.log('Called onSelectCondition => ', node, path);
    }

    hasChildren(args) {
        return args.children && args.children.length;
    }

    // Add Placeholder
    addPlaceholder() {
        
    }

    trav(obj, path, index) {
        // const { children = [], ...restObj } = obj;
        index = index ? index : 0;
        path = path ? path : [0];
        path.push(index);
        index++;
        
        // console.log(this.currentIndex);
        // if(children) {
        //     console.log(children);
        //     children.forEach((child, i) => {
        //         this.trav(child);
        //         // console.log(child);
        //         console.log('children => ', i);
        //         // index++;
        //     });
        // } else {
        //     console.log(restObj/* , this.currentIndex */);
        //     this.currentIndex++;
        //     // return restObj;
        // }
        


        /* 
        children.map((el, i) => {
            console.log(el, i, path);
            this.trav(el, path, index);
        });
        
        */
        console.log('ORIGINAL JSON OBJECT => ', obj);

        // this.collector = {};
        let collector2 = [];
        const cbTransform = () => {
            /* if(typeof args == 'object') {
                collector = {...collector, ...args};
            }
            if(Array.isArray(args)) {
                collector2 = [...collector2, ...args];
            } */
            
            /* let operator = args.operator;
            let tmpObj = {};
            tmpObj[operator] = {args};
            this.collector.push({
                ...tmpObj
            }); */


            // this.createRulesStructure(args);


            // console.log('DING DING cbTransform => ', arguments, args);
        };

        const result = JSONPath({path: '$...', json: obj, callback: cbTransform, flatten: true});
        console.log('RESULT => ', result);  
        console.log('FINAL JSON OBJECT => ', this.collector, collector2);

        
        // console.log(restObj, children, this.currentIndex);


        // this.createRulesStructure(obj);



        // obj.forEach(cb);

        // for (const [key, value] of Object.entries(obj)) {
        //     console.log('Entries => ', key, value);
        //     // myCollector
        // }

        // const { operator, children = [] } = obj;
        // const mapCallback = children.map((el, ix, thisArray) => {
        //     console.log('FOR MAP L2 => ', el, ix);
        //     return (
        //         el
        //     );
        // });

        const mapCallback = (obj) => {
            const { operator, children = [] } = obj;
            const res2 = {};
            res2[operator] = children.map((el, ix) => {
                console.log('FOR MAP L2 => ', el, ix);
                if(!el.children)
                    return el;
                else
                    return mapCallback(el);
            });
            console.log('res2 => ', res2);
            return res2;
        };

        
        
        if(typeof obj === 'object') {
            // children.forEach((el, ix, thisArr) => cb(el, ix, thisArr, operator));

            // const iResult = children.map((el, ix, thisArray) => {
            //     const { operator, children = [] } = el;
            //     if(!el.children) {
            //         console.log('FOR MAP => ', el, ix);
            //         return (
            //             el
            //         );
            //     } else {
            //         // const res2 = {};
            //         // res2[operator] = children.map((el, ix, thisArray) => {
            //         //     console.log('FOR MAP L2 => ', el, ix);
            //         //     return (
            //         //         el
            //         //     );
            //         // });
            //         // console.log('res2 => ', res2);
            //         // return {'OR': res2};
            //         return mapCallback(el);
            //     }
            // });

            const iResult = mapCallback(obj);

            console.log('RESULT MAP ITERATION => ', iResult);
        }

        
        
        
        // (this.hasChildren(obj))
        // return obj;
    }

    createRulesStructure(args, path, index) {
        let operator = args.operator;
        let tmpObj = {};
        path = path ? path : 0;
        index = index ? index : 0;

        let collectorObject = {};
        
        if(typeof args === 'object' && operator) {
            operator = args.operator;
            // tmpObj[operator] = [...args.children];
            console.log(tmpObj);
            /* if(args.children) {
                args.children.forEach((el, i) => {
                    this.createRulesStructure(el);
                });
            } */
            
            
            // tmpObj[operator] = [...args.children];

            const rs = this.travParent(collectorObject, args, index);
            console.log('RESULT SET \'rs\' => ', rs);

            // Commented Just Now
            /* 
            tmpObj[operator] = [
                ...this.travChildrens(collectorObject, args)
            ];

            console.log('tmpObj => ', tmpObj);
            */

        }

        // this.collector.push({
        //     ...tmpObj
        // });
        // return this.collector;
    }

    travChildrens(collectorObject, children, index) {
        let collectorArray = [];
        index = index || 0;
        console.log('Index => ', index);
        
        if(children) {
            index++;
            children.forEach((el, i) => {
                console.log('Loop Index => ', i);
                // index++;
                // this.createRulesStructure(el);
                if(el.children) {
                    // console.log('Index => ', index);

                    // return 
                    let rs = this.travParent(collectorObject, el, index);
                    return rs;
                }
                collectorArray.push(el);
            });
        }
        // collectorArray.push(args);

        console.log(collectorArray, index);

        return collectorArray;
    }

    travParent(collectorObject, args, index) {

        let tmpObj = {};
        let operator = args.operator;

        if(typeof args === 'object' && operator) {
            // let operator = args.operator;
            // tmpObj[operator] = [...args.children];
            const { operator, children } = args;

            // console.log(tmpObj);

            tmpObj[operator] = [
                ...this.travChildrens(collectorObject, children, index),
            ];

            collectorObject = {...collectorObject, ...tmpObj};

            console.log('tmpObj => ', tmpObj, collectorObject);

            return collectorObject;

        }

    }



    /**
     * NEW Logic to traverse Tree - with PATH
     * @param {object} treeData 
     * @param {object} keyMap 
     * @param {object} path 
     * @returns transformed object of Array
     */
    // Traverse
    // Handle outer object... i.e. other than children
    traverseTreeX(treeData, keyMap, path, currentIndex) {
        const { operator, children = [], ...objRest } = treeData;
        const result = {...objRest, operator};
        path = path || [0];
        result['children'] = children.map((el, i) => {
            currentIndex = i || 0;
            console.log('LOOP MAP: => ', el, i, ' tree-path => ', path);
            if(!el.children){
                return el;
            }
            else {
                console.log('HAS CHILDREN...', path, currentIndex);
                // if(i == thisArray.length -1)
                path.push(currentIndex);
                return this.traverseTree(el, path, currentIndex);
            }
        });
        // console.log('LOOP MAP: result => ', result, 'path => ', path);
        return result;
    }

    // findInTree
    traverseTree(treeData, currentPath) {

        let sData;
        currentPath = [0, 1];//, 0];
        const tmpPath = [...currentPath];
        // tmpPath.shift();

        sData = treeData.children[tmpPath];
        
        if(1 || tmpPath.length > 1) {

            
            // tmpPath.shift();
            
            // sData = treeData.children[tmpPath].children[];
            
            // sData = this.findInNode(treeData, tmpPath);   //.children[tmpPath], 1);
            
            // sData = this.findInNode(sData, tmpPath);

            const myNewNode = {id: 'TEST 1', new: true};
            sData = this.insertInNode(treeData, tmpPath, myNewNode);
        }

        console.log('tmpPath', tmpPath, sData);
    }

    findInNode(node, currentPath) {
        const { children } = node;
        const currentPathIndex = currentPath[0];
        if(currentPath.length > 1) {
            console.log('DD');
        }

        if(children.length > currentPathIndex)
            return children[currentPathIndex];
        return null;
    }

    /**
     * Converts a string path to a value that is existing in a json object.
     * 
     * @param {Object} jsonData Json data to use for searching the value.
     * @param {Object} path the path to use to find the value.
     * @returns {valueOfThePath|null}
     */
    jsonPathToValue(jsonData, path) {
        if (!(jsonData instanceof Object) || typeof (path) === 'undefined') {
            throw 'Not valid argument:jsonData:' + jsonData + ', path:' + path;
        }
        path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        path = path.replace(/^\./, ''); // strip a leading dot
        var pathArray = path.split('.');
        for (var i = 0, n = pathArray.length; i < n; ++i) {
            var key = pathArray[i];
            if (key in jsonData) {
                if (jsonData[key] !== null) {
                    jsonData = jsonData[key];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
        return jsonData;
    }

    insertInNode(treeData, currentPath, myNewNode) {

        const { children } = treeData;
        let newPath;
        let val = {};
        // currentPath.shift();

        if(currentPath.length > 1) {

            newPath = currentPath.join('.children.').slice(2);
            
            console.log('TEST insertInNode', children, currentPath);
            val = this.jsonPathToValue(treeData, newPath);
        } else {
            val = treeData;
        }
            
        /* const nodeList = children.map((el, i) => {
            console.log('TEST insertInNode', el);
        }); */


        console.log('TEST insertInNode', treeData, currentPath, myNewNode, val);
    }







    render() {
        const {data, cursor} = this.state;
        
        // this.traverseTree(data); // COMMENTED FOR GOOD 

        // this.rewriter(data);

        // const myTreeData = walk({treeData, getNodeKey, callback, ignoreCollapsed: false});
        // console.log('Hello from RENDER 1', myTreeData);
        

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
                        onSelectConnector={this.onSelectConnector}
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
