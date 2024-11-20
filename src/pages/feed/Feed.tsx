import PostFeed from "../../components/postFeed/PostFeed";
import { useFeedContext } from "../../contexts/FeedContext";

export default function Feed() {
    const { feedKey } = useFeedContext();
    return (
        <div>
            <PostFeed key={feedKey} isProfileFeed={false} />
        </div>
    )
}