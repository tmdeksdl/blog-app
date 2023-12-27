import { Link } from 'react-router-dom';
import { useState } from 'react';
interface PostListProps {
  hasNavigator?: boolean;
}
type TabType = 'all' | 'my';
export default function PostList({ hasNavigator = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  return (
    <>
      {hasNavigator && (
        <div className="post_navigator">
          <div
            role="presentation"
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'post_navigator--active' : ''}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab('my')}
            className={activeTab === 'my' ? 'post_navigator--active' : ''}
          >
            나의글
          </div>
        </div>
      )}
      <div className="post_list">
        {[...Array(10)].map((e, index) => (
          <div key={index} className="post_box">
            <Link to={`/posts/${index}`}>
              <div className="post_profile_box">
                <div className="post_profile"></div>
                <div className="post_author">작가이름</div>
                <div className="post_date">1999.10.10 로요일</div>
              </div>
              <div className="post_title">제목</div>
              <div className="post_text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                a elementum odio, ut tincidunt velit. Aliquam laoreet vitae
                sapien eget porta. In imperdiet consectetur quam eget maximus.
                Maecenas volutpat est quis nunc varius ultricies. Aliquam eget
                nisl et arcu consequat tristique. Praesent vestibulum ante
                tempus, porta dui quis, eleifend magna. Curabitur consequat nec
                orci et commodo. Curabitur quis vehicula tortor, eget suscipit
                orci. Aliquam egestas at purus id scelerisque.
              </div>
              <div className="post_util_box">
                <div className="post_delete">삭제</div>
                <div className="post_edit">수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
