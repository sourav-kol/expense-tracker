import { NavItems } from '@/types';
import { Flex } from 'antd';
import NavigationItem from "./NavigationItems";

type Props = {
    NavItem: NavItems
}

function NavigationBar(props: Props) {
    const { NavItem } = props;
    return <Flex className='nav' gap={"middle"} align="center">
            {
                NavItem.Items.map((item) => {
                    return <NavigationItem Item={item}></NavigationItem>
                })
            }
        </Flex>
}

export default NavigationBar;
