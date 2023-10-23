import { useParams } from 'react-router-dom';

const PostDetailPage = () => {
  const params = useParams();

  return <div>PostDetailPage, Params: {params?.id}</div>;
};

export default PostDetailPage;
