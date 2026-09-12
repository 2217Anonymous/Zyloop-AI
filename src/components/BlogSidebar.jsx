import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { formatBlogDateShort } from '../api/client'
import BlogFeaturedImage from './BlogFeaturedImage'
import { archives, tags } from '../data/content'

export default function BlogSidebar({ blogs = [], loading = false }) {
  const popularPosts = useMemo(
    () => [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3),
    [blogs],
  )

  const categories = useMemo(() => {
    const counts = {}
    blogs.forEach((post) => {
      ;(post.categories || []).forEach((category) => {
        counts[category] = (counts[category] || 0) + 1
      })
    })
    return Object.entries(counts).map(([name, count]) => ({ name, count }))
  }, [blogs])

  return (
    <div className="row">
      <div className="w-full">
        <div className="side_tags">
          <div className="search-bar">
            <form onSubmit={(e) => e.preventDefault()} role="search">
              <label className="sr-only" htmlFor="s">Search</label>
              <div className="input-group">
                <input className="field form-control" id="s" name="s" type="text" placeholder="Search …" />
                <span className="input-group-append">
                  <button className="submit btn-search" type="submit">
                    <FaSearch />
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>

        <div className="cat_sec">
          <h4 className="text-center lg:text-left">Categories</h4>
          {loading && <p className="sidebar-note">Loading categories…</p>}
          {!loading && categories.length === 0 && <p className="sidebar-note">No categories yet.</p>}
          <ul>
            {categories.map((c) => (
              <li key={c.name}>
                <span>{c.name} </span> <span className="dots"></span> <p>{c.count}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="popular_posts">
          <h4 className="text-center lg:text-left">Popular Posts</h4>
          {loading && <p className="sidebar-note">Loading posts…</p>}
          {!loading && popularPosts.length === 0 && <p className="sidebar-note">No posts yet.</p>}
          {popularPosts.map((p) => (
            <Link to={`/blog/${p.slug}`} className="media-box flex flex-wrap -mx-[15px]" key={p.id}>
              <div className="w-5/12 px-[15px]">
                <BlogFeaturedImage
                  src={p.image}
                  alt={p.title}
                  variant="sidebar"
                  className="box-img"
                />
              </div>
              <div className="w-7/12 px-[15px] box-detail">
                <h2>{p.title}</h2>
                <p>
                  {formatBlogDateShort(p.date)} | by <span>{p.author}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="tags_sec">
          <h4 className="text-center lg:text-left">Tags</h4>
          <div className="tags text-center lg:text-left">
            {tags.map((t) => (
              <span className="rounded-pill" key={t}>{t}</span>
            ))}
          </div>
        </div>

        <div className="cat_sec">
          <h4 className="text-center lg:text-left">Archieves</h4>
          <ul>
            {archives.map((a) => (
              <li key={a.name}>
                <span>{a.name} </span> <span className="dots"></span> <p>{a.count}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="advertisment">
          <img src="/images/blogs/advertisment.jpg" alt="advertisement" />
        </div>
      </div>
    </div>
  )
}
