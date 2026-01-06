import { useEffect, useState } from "react"
import FormDialog from "./createPost";
import deletePost from "./DeletePost";
import Button from '@mui/material/Button';
import { fetchPosts as ApifetchPosts } from "./ApiPosts";
import UpdatePostDialog from "./UpdatePost"
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import Stack from '@mui/material/Stack';


const Posts = ({ data }) => {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([]);
    const { query } = useOutletContext();


    const fetchPosts = async () => {
        try {
            const { data } = await ApifetchPosts();
            setPosts(data)
            setFilteredPosts(data)
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }
    useEffect(() => {
        fetchPosts()
    }, [])

    useEffect(() => {
        if (!posts) return
        const filtred = posts.filter(post =>
            Object.values(post).some(value =>
                value.toString().toLowerCase().includes(query.toLowerCase())
            )
        )
        setFilteredPosts(filtred)
    }, [query, posts])

    if (posts.length === 0) return <h1>Loading...</h1>



    return (
        <div className="posts">
            <Button variant="outlined" component={RouterLink} to="/">
                HOME
            </Button>
            <FormDialog  onPostCreated={fetchPosts}/>
            {filteredPosts.map((post) => (
                <div key={post._id} className="post-item">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <Stack spacing={2} direction="row">
                    <Button
                        variant="outlined" startIcon={<DeleteIcon />}
                        onClick={() => deletePost({ id: post._id, posts, setPosts })} >
                        Delete
                    </Button>
                    <UpdatePostDialog post={post} posts={posts} setPosts={setPosts} />
                    </Stack>
                </div>

            ))}
        </div>

    )
}
export default Posts;