import React, { PureComponent } from 'react';
import { Modal, message, Upload, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { UPLOAD_PHOTO, IMG_ROOT } from '../../constants/api';
import _ from 'lodash';

const Dragger = Upload.Dragger;

const FILE_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp'];

const beforeUpload = file => {
    const isSupported = _.includes(FILE_TYPES, file.type);
    if (!isSupported) {
        message.error('不支持当前文件格式:(');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('文件大小不得超过2MB');
    }
    return isSupported && isLt2M;
};

const updateAvatar = gql`
    mutation updateAvatar($avatar: String!) {
        updateUserInfo(avatar: $avatar) {
            success
        }
    }
`;

@graphql(updateAvatar)
class UploadAvatarModal extends PureComponent {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
        mutate: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
    };

    state = {};

    handleChange = info => {
        if (info.file.status === 'uploading')
            this.setState({ uploading: true });
        else if (info.file.status === 'done')
            this.setState({ uploading: false, ...info.file.response });
        // if (info.file.status === 'done') {
        //   // Get this url from response in real world.
        //   getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        // }
    };

    handleSubmit = () => {
        this.setState({ settingInfo: true });
        const { closeModal, onSubmit } = this.props;
        this.props
            .mutate({
                variables: { avatar: this.state.url },
            })
            .then(({ data }) => {
                data.updateUserInfo.success
                    ? message.success('设置成功', 5)
                    : message.error('设置失败', 5);
                this.setState({ settingInfo: false });
                onSubmit();
                closeModal();
            })
            .catch(error => {
                console.log('setting info', error);
                this.setState({ settingInfo: false });
                message.error(error.message);
            });
    };

    handleCancel = () => {
        const { closeModal } = this.props;
        // clear current state
        this.setState({});
        closeModal();
    };

    render = () => {
        const { visible } = this.props;
        const { uploading, url } = this.state;
        return (
            <Modal
                wrapClassName="vertical-center-modal"
                visible={visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
                footer={[
                    <Button
                        loading={this.state.settingInfo}
                        key="submit"
                        ghost
                        type="primary"
                        size="large"
                        onClick={this.handleSubmit}
                    >
                        确认
                    </Button>,
                ]}
            >
                <div className="avatar-dragger-wrapper">
                    <Dragger
                        name="photo"
                        className="avatar-dragger"
                        multiple={false}
                        showUploadList={false}
                        action={UPLOAD_PHOTO}
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {url
                            ? <img
                                  src={IMG_ROOT + url}
                                  alt="avatar"
                                  className="avatar-img"
                              />
                            : <div>
                                  <Icon
                                      type={uploading ? 'loading' : 'upload'}
                                      className="upload-icon"
                                  />
                                  <div className="upload-icon-text">
                                      {uploading ? '上传中...' : '上传头像'}
                                  </div>
                              </div>}
                    </Dragger>
                    <div>类型：jpg, jpeg, gif, png, bmp 大小：{'<'}2MB</div>
                </div>
            </Modal>
        );
    };
}

export default UploadAvatarModal;
