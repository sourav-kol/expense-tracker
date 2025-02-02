// todo:  https://ui.shadcn.com/docs/components/navigation-menu
import { NavItems } from '@/src/types';
import NavigationItem from "./NavigationItems";

type Props = {
    NavItem: NavItems
}

function NavigationBar(props: Props) {
    const { NavItem } = props;
    return (
        <div className="fixed top-12 left-1/2 w-4/5 h-9/10 bg-gray-800 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-lg p-4 z-10">
            <div className="flex justify-center space-x-4">
                {
                    NavItem.Items.map((item) => {
                        return <NavigationItem key={item.Key} Item={item}></NavigationItem>
                    })
                }
            </div>
        </div>
    );
}

export default NavigationBar;
