import React, { PureComponent } from 'react';
import {
  CSSGrid,
  layout,
  measureItems,
  makeResponsive,
} from 'react-stonecutter';
import { Switch, Route } from 'react-router-dom';
import Content from '@_global/Content';
import ImageGrid from './ImageGrid';
import Image from './Image';
import './style.css';

import { Row, Col, Spin } from 'antd';

const Grid = makeResponsive(measureItems(CSSGrid, { measureImages: true }), {
  maxWidth: 1000,
});

const data = Array(10).fill(
  'https://avatars1.githubusercontent.com/u/18493382?v=4&s=460'
);

class AlbumnHome extends PureComponent {
  render() {
    return (
      <div className="centered-horizontal">
        <Grid
          component="ul"
          columnWidth={150}
          gutterWidth={5}
          gutterHeight={5}
          layout={layout.pinterest}
          duration={800}
          easing="ease-out"
        >
          {data.map((value, index) =>
            <li key={value + index}>
              <ImageGrid src={value} alt={'test ' + index} />
            </li>
          )}
        </Grid>
      </div>
    );
  }
}

class Albumn extends PureComponent {
  static routeConfig = {
    title: '虚影',
    typingStrings: ['一些梦到的，^1000想起的，^1000见证过的东西。'],
  };
  render = () => {
    return (
      <Content title={Albumn.routeConfig.title}>
        <Row type="flex" justify="center">
          <Col>
            <Spin tip="施工中..." size="large" />
          </Col>
        </Row>
      </Content>
    );
  };
  // render() {
  //   return (
  //     <Content title={Albumn.routeConfig.title}>
  //       <div className="centered-horizontal">
  //         <Switch>
  //           <Route path="/albumn" exact component={AlbumnHome} />
  //           <Route path="/albumn/:albumn/:series/:id" exact component={Image} />
  //       </Switch>
  //       </div>
  //     </Content>
  //   );
  // }
}

export default Albumn;
