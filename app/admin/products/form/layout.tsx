import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Tạo sách mới',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>{children}</>
    )
}