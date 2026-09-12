import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { getBlogBySlug, getBlogs } from '../api/blogs'
import { formatBlogDate } from '../api/client'
import { Container, Row, Col } from '../components/Grid'
import PageBanner from '../components/PageBanner'
import BlogFeaturedImage from '../components/BlogFeaturedImage'
import BlogSidebar from '../components/BlogSidebar'
import BlogCommentForm from '../components/BlogCommentForm'
import BlogPostNav from '../components/BlogPostNav'
import ContentState from '../components/ContentState'
import { BlogContentBody } from '../utils/blogContent'

const WRITER_IMAGE = '/images/test1.jpg'

export default function SingleBlog() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [allPosts, setAllPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getBlogBySlug(slug), getBlogs()])
      .then(([blog, blogs]) => {
        if (!blog) throw new Error('Blog post not found')
        setPost(blog)
        setAllPosts(blogs.sort((a, b) => new Date(b.date) - new Date(a.date)))
      })
      .catch((err) => setError(err.message || 'Unable to load blog post'))
      .finally(() => setLoading(false))
  }, [slug])

  const navigation = useMemo(() => {
    if (!post) return { prev: null, next: null }
    const index = allPosts.findIndex((item) => item.slug === post.slug)
    return {
      prev: index > 0 ? allPosts[index - 1] : null,
      next: index >= 0 && index < allPosts.length - 1 ? allPosts[index + 1] : null,
    }
  }, [allPosts, post])

  const bannerTitle = post?.title || 'Blog Detail'

  return (
    <main className="single-blog-page">
      <PageBanner
        title={bannerTitle}
        image={post?.image || '/images/blogs/single-blog-slider.jpg'}
      />
      <section className="main" id="main">
        <div className="blog-content single-blog-content padding-top padding-bottom">
          <Container>
            <Row>
              <Col span={12} lg={8}>
                <ContentState
                  loading={loading ? 'Loading blog post…' : false}
                  error={!loading && error ? error : false}
                />

                {!loading && !error && post && (
                  <div className="main_content text-center lg:text-left">
                    <div className="detail_blog">
                      <div className="blog_detail">
                        <p className="blog-sub-heading text-center lg:text-left">
                          <span></span>{(post.categories || [])[0] || 'ZYLOOP AI'}
                        </p>

                        <span className="d-blog-text">
                          <span>{formatBlogDate(post.date)}</span> | BY <span>{post.author}</span>
                          {(post.categories || []).length > 0 && (
                            <>
                              {' '}|{' '}
                              {(post.categories || []).map((category, index) => (
                                <span key={category}>
                                  {index > 0 ? ', ' : ''}
                                  {category}
                                </span>
                              ))}
                            </>
                          )}
                        </span>

                        {post.image && (
                          <BlogFeaturedImage
                            src={post.image}
                            alt={post.title}
                            className="single_img mb-4"
                          />
                        )}

                        {post.excerpt && (
                          <p className="d-text cms-single-excerpt">{post.excerpt}</p>
                        )}

                        <BlogContentBody content={post.content || ''} />

                        <div className="blog-detail-social">
                          <div className="blog-detail-tags tags">
                            {(post.tags || []).map((tag) => (
                              <span key={tag}>{tag}</span>
                            ))}
                          </div>
                          <div className="blog-detail-social-icons social-tags">
                            <span className="fb">
                              <a href="#" aria-label="Share on Facebook">
                                <FaFacebookF />
                              </a>
                            </span>
                            <span className="twit">
                              <a href="#" aria-label="Share on X">
                                <FaXTwitter />
                              </a>
                            </span>
                            <span className="in">
                              <a href="#" aria-label="Share on LinkedIn">
                                <FaLinkedinIn />
                              </a>
                            </span>
                            <span className="pin">
                              <a href="#" aria-label="Share on Pinterest">
                                <FaPinterestP />
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="writer-detail">
                      <BlogPostNav prev={navigation.prev} next={navigation.next} />

                      <div className="posted_by">
                        <div className="posted-by-inner">
                          <img
                            className="posted-by-avatar"
                            src={WRITER_IMAGE}
                            alt={post.author}
                          />
                          <div className="posted-by-body">
                            <span>Written By</span>
                            <h5>{post.author}</h5>
                            <p className="d-text">{post.excerpt}</p>
                          </div>
                        </div>
                      </div>

                      <BlogCommentForm />
                    </div>
                  </div>
                )}
              </Col>
              <Col span={12} lg={4}>
                <BlogSidebar blogs={allPosts} loading={loading} />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </main>
  )
}
