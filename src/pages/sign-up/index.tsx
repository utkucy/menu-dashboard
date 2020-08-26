import React from 'react'
import { observer } from "mobx-react";
import { action, observable, computed } from "mobx";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  message
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import styled from 'styled-components'
import Router from 'next/router';

import SignUpStore from './store'
import { User } from 'models/user';



const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


@observer
class SignUpPage extends React.Component {

  @observable autoCompleteResult: any

  @action.bound
  setAutoCompleteResult(result: Array<string>, value?: string ) {
    if (result.length === 0)
      this.autoCompleteResult = []
    else {
      this.autoCompleteResult = result.map(domain => `${value}${domain}`)
    }
  }

  @action.bound
  prefixSelector() {
    return (
      <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
          <Option value="05">+05</Option>
          <Option value="87">+87</Option>
        </Select>
      </Form.Item>
    )
  }
  
  @action.bound
  onWebsiteChange (value: string) {
    if (!value) {
      this.setAutoCompleteResult([]);
    } else {
      this.setAutoCompleteResult(['.com', '.com.tr', '.net'], value);
    }
  };

  // const websiteOptions = autoCompleteResult.map(website => ({
  //   label: website,
  //   value: website,
  // }));

  @computed
  get websiteOptions() {
    return (
      this.autoCompleteResult?.map((website: string) => ({
        label: website,
        value: website,
      }))
    )
  }

  async onFinish (values: Store) {
    console.log( values.email);
    console.log('Received values of form: ', values);
    const user = new User({
      email: values.email,
      password: values.password,
      restaurant_name: values.restaurant_name,
      phone_number: values.phone_number,
      website: values.website,
      trial: true
    })
    await SignUpStore.signup(user)
    if (SignUpStore.signup_status) {
      message.success('Hesabınız başarıyla oluşturuldu')
      Router.push('/login')
    }
    else
      return (
        message.error('Girilen E-Posta adresine kayıtlı bir hesap bulunmakta')
      )
  };

  loginClick() {
    Router.push('/login')
  }



  render() {
    return (
      <Container>
          <Form
          {...formItemLayout}
          // form={form}
          name="register"
          onFinish={this.onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
          }}
          scrollToFirstError
          style={{ width: 500 }}
        >
          <Form.Item
            name="email"
            label="E-Posta"
            rules={[
              {
                type: 'email',
                message: 'Lütfen geçerli bir E-Posta giriniz',
              },
              {
                required: true,
                message: 'E-Posta alanı zorunludur',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Şifre"
            rules={[
              {
                required: true,
                message: 'Lütfen şifrenizi giriniz',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Şifre Onayı"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Lütfen şifrenizi onaylayınız',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Girilen şifreler eşleşmiyor');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="restaurant_name"
            label={
              <span>
                Restorant Adı&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[{ required: true, message: 'Restorant adının girilmesi zorunludur', whitespace: true }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            name="residence"
            label="Habitual Residence"
            rules={[
              { type: 'array', required: true, message: 'Please select your habitual residence!' },
            ]}
          >
            <Cascader options={residences} />
          </Form.Item> */}

          <Form.Item
            name="phone_number"
            label="Telefon Numarası"
            rules={[{ required: true, message: 'Lütfen telefon numaranızı giriniz' }]}
          >
            {/* addonBefore={this.prefixSelector} */}
            <Input  style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="website"
            required={false}
            label="İnternet Sitesi"
            // rules={[{ required: true, message: 'Please input website!' }]}
          >
            <AutoComplete options={this.websiteOptions} onChange={this.onWebsiteChange} placeholder="website">
              <Input />
            </AutoComplete>
          </Form.Item>
{/* 
          <Form.Item label="Captcha" extra="We must make sure that your are a human.">
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[{ required: true, message: 'Please input the captcha you got!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item> */}

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              <a href="">Kullanıcı Sözleşmesini</a> okudum ve kabul ediyorum
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button block={true} type="primary" htmlType="submit">
              Kaydol
            </Button>
          </Form.Item>
          <Button onClick={this.loginClick} block={true} type="link">
            Hesabınız var mı? Hemen giriş yapın
          </Button>
        </Form>
      </Container>
    )
  }
}


const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`








export default SignUpPage