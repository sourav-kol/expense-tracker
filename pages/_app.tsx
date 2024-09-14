import React from 'react';
import { Layout,Divider } from 'antd';
import type { AppProps } from 'next/app'
import NavigationBar from '@/components/common/Navigation/NavigationBar';
import { Nav } from '@/constants/AppConstants';
import '../public/styles.scss';

const { Footer, Content } = Layout;

const metadata = {
    title: 'Story',
    description: 'Tell your story',
}

export default function RootLayout({ Component, pageProps }: AppProps) {
    return (
        <Layout className='layout'>
            <NavigationBar NavItem={Nav()}></NavigationBar>
            <Content className='content'>
                <Component {...pageProps} />
            </Content>
            {/* <Divider plain></Divider> */}
            <Footer style={{ textAlign: 'center' }}>
                Next Js Footer
            </Footer>
        </Layout>
    )
}
