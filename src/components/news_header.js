/*
* 新闻头部组件
*/
import React,{Component} from "react" ;
import {Link} from "react-router" ;

import {
    Row,
    Col,
    Menu,
    Icon,
    Button,
    Modal,//对话框
    Tabs,
    Form,//表单
    Input,//单行输入
} from "antd" ;
import logo from "../images/logo.png" ;


let MenuItem= Menu.Item ;
let TabPane=Tabs.TabPane;
let FormItem= Form.Item ;

 class  NewsHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            username:null,
            selectkey:"top",
            modalShow:false
        }
    }
    //处理点击MenuItem 的回调
    handleClickItem=event=>{
        //更新selectkey
        this.setState({selectkey:event.key});
        //如果Key是regist,显示对话框
        if(event.key==='regist'){
            this.setState({ modalShow:true})
        }
    };
     // 关闭对话框
    handleClose=()=>{
        //更新modalShow 对话框
        this.setState({ modalShow:false})
    };




    render(){
        let {selectkey,username,modalShow}=this.state ;
        let userInfo= username
            ?(
                <MenuItem key="logout" className="register">
                    <Button type="primary">{username}</Button>&nbsp;&nbsp;
                    <Link to="/username">
                        <Button type="dashed">个人中心 </Button>
                    </Link>&nbsp;&nbsp;
                    <Button> 退出</Button>&nbsp;&nbsp;
                </MenuItem>
            )
            :(
                <MenuItem key="regist" className="register">
                    <Icon type="global"/>登录/注册
                </MenuItem>
            );
        let { getFieldDecorator}=this.props.form ;
        return(
            <header>
                <Row>
                    <Col span={1}> </Col>
                    <Col span={3}>
                        <a href="/" className="logo">
                            <img src={logo} alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={19}>
                        <div>
                            <Menu mode="horizontal" selectedKeys={[selectkey]} onClick={this.handleClickItem}>
                                <MenuItem key="top">
                                    <Icon type="global"/>头条
                                </MenuItem>
                                <MenuItem key="shehui">
                                    <Icon type="global"/>社会
                                </MenuItem>
                                <MenuItem key="guonei">
                                    <Icon type="global"/>国内
                                </MenuItem>
                                <MenuItem key="guoji">
                                    <Icon type="global"/>国际
                                </MenuItem>
                                <MenuItem key="yule">
                                    <Icon type="global"/>娱乐
                                </MenuItem>
                                <MenuItem key="tiyu">
                                    <Icon type="global"/>体育
                                </MenuItem>
                                <MenuItem key="keji">
                                    <Icon type="global"/>科技
                                </MenuItem>
                                <MenuItem key="shishang">
                                    <Icon type="global"/>时尚
                                </MenuItem>
                                {userInfo}

                            </Menu>
                            <Modal title="用户中心"
                                    visible={modalShow}
                                    onOk={this.handleClose}
                                    onCancel={this.handleClose}
                                    okText="关闭">
                                <Tabs type="card">
                                    <TabPane tab="登录" key="1">
                                        <Form onSubmit={this.handleSubmit.bind(this, false)}>
                                            <FormItem label='用户名'>
                                                {
                                                    getFieldDecorator('userName')(
                                                        <Input prefix={<Icon type="user" style={{ fontSize: 13, backgroundColor:'skyblue' }} />} placeholder="Username" />
                                                    )
                                                }
                                            </FormItem>
                                            <FormItem label='密码'>
                                                {
                                                    getFieldDecorator('password')(
                                                        <Input prefix={<Icon type="lock" style={{ fontSize: 13, backgroundColor:'skyblue' }} />} type="password" placeholder="Password" />
                                                    )
                                                }
                                            </FormItem>
                                            <Button type="primary" htmlType="submit"> 登录</Button>
                                        </Form>
                                    </TabPane>
                                    <TabPane tab="注册" key="2" >
                                        <Form onSubmit={this.handleSubmit.bind(this, true)}>
                                            <FormItem label='用户名'>
                                                {
                                                    getFieldDecorator('r_userName')(
                                                        <Input prefix={<Icon type="user" style={{ fontSize: 13, backgroundColor:'skyblue' }} />} placeholder="Username" />
                                                    )
                                                }
                                            </FormItem>
                                            <FormItem label='密码'>
                                                {
                                                    getFieldDecorator('r_password')(
                                                        <Input prefix={<Icon type="lock" style={{ fontSize: 13, backgroundColor:'skyblue' }} />} type="password" placeholder="Password" />
                                                    )
                                                }
                                            </FormItem>
                                            <FormItem label='确认密码'>
                                                {
                                                    getFieldDecorator('r_confirm_password')(
                                                        <Input prefix={<Icon type="lock" style={{ fontSize: 13, backgroundColor:'skyblue' }} />} type="password" placeholder="Password" />
                                                    )
                                                }
                                            </FormItem>
                                            <Button type="primary" htmlType="submit">注册</Button>
                                        </Form>
                                    </TabPane>
                                </Tabs>
                            </Modal>
                        </div>
                    </Col>
                    <Col span={1}> </Col>
                </Row>
            </header>
        )
    }
}
//所有包含<Form>的组件类都需要使用 Form.create()来包装一下
/*
  结果是：
*  this.props.form
*  getFieldDecorator()包装<Input>
*  getFieldsValue(): 返回包含所有输入框数据的集合对象
* */
let NewsHeaderForm =Form.create()(NewsHeader);
export default NewsHeaderForm ;//向外暴露的必须是包装后的组件