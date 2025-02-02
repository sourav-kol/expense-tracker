'use client'

import { NavItem } from "@/src/types";
import Link from 'next/link'
import { useRouter } from "next/router";

type Props = {
    Item: NavItem
}

function NavigationItems(prop: Props) {
    const { Item } = prop;
    const router = useRouter();

    const isActive: boolean = router.pathname.toLocaleLowerCase().includes(Item.Key);
    return <>
        <Link href={Item.Key} key={Item.Key} className={`${isActive ? "text-crimson hover:text-crimson" : "text-white hover:text-crimson"}`}>{Item.Label}</Link>
    </>;
}

export default NavigationItems;