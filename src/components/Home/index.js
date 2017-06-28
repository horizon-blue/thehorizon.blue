import React, { Component } from 'react';
import classnames from 'classnames';

import './style.css';
import './home.graphql';

class Home extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={classnames('Home', className)}>
        <p className="App-intro">
          之前一直想写一个<del>酷炫</del>的个人网站，然而一直未果。正好最近在折腾<code>React Native</code>，就想着顺手用<code>React</code>把天际林整理一下好了。
        </p>
        <p className="App-intro">
          你现在看到的只是<del>又一个</del>占位置的首页，具体内容最近会抽空更新。在此之前，欢迎去原博客<a href="http://www.forestofhorizon.com/">天际林</a>转转。
        </p>
        <p className="App-intro">
          回见。
        </p>
        <p className="App-intro">
          — 蓝色天际 | HorizonBlue —
        </p>
      </div>
    );
  }
}

export default Home;
