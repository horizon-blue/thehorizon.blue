import React, { PureComponent } from 'react';
import { CSSGrid, layout, measureItems, makeResponsive } from 'react-stonecutter';
import Content from '@_global/Content';
import ImageGrid from './ImageGrid';
import './style.css';

const Grid = makeResponsive(measureItems(CSSGrid, { measureImages: true }), { maxWidth: 1000 });

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class Albumn extends PureComponent {
  static routeConfig = {
    title: '虚影',
    typingStrings: ["一些梦到的，^1000想起的，^1000见证过的东西。"]
  };
  render() {
    return (
      <Content title={Albumn.routeConfig.title}>
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
            {data.map(value => <li key={value}><ImageGrid /></li>)}
          </Grid>
        </div>
      </Content>
    );
  }
}

export default Albumn;
