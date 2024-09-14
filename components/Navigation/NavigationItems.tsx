'use client'

import { NavItem } from "@/types";
import Link from 'next/link'
import { useRouter } from "next/router";

type Props = {
    Item: NavItem
}

function NavigationItems(prop: Props) {
    const { Item } = prop;
    const router = useRouter();

    const isActive: boolean = router.pathname.toLocaleLowerCase() === Item.Key;
    return <>
        <Link href={Item.Key} key={Item.Key} className={`nav-btn ${isActive ? "active" : ""}`}>{Item.Label}</Link>
    </>;
}

export default NavigationItems;