import Loadable from 'react-loadable';
import Loading from 'components/_global/Loading';

const LoadableEditor = Loadable({
    loader: () => import(/* webpackChunkName: "PostEditor" */ `./PostEditor`),
    loading: Loading,
});

export default LoadableEditor;
