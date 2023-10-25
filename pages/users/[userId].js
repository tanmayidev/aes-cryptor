import { useRouter } from "next/router";

export default function userDetail() {
    const router = useRouter()
    const userId = router.query.userId
    return(
        <h1>{userId}</h1>
    )
}