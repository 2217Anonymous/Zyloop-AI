export default function BlogCommentForm({ variant = 'default' }) {
  const isEditorial = variant === 'editorial'

  return (
    <div className={`comment-form${isEditorial ? ' comment-form--editorial' : ''}`}>
      <div className="msg-heading">
        <span>{isEditorial ? 'Leave a comment' : 'Write a Message'}</span>
      </div>
      <form className="my-form" onSubmit={(event) => event.preventDefault()}>
        {isEditorial ? (
          <div className="comment-form-row">
            <input type="text" name="name" placeholder="Name" aria-label="Name" />
            <input type="email" name="email" placeholder="Email" aria-label="Email" />
            <input type="text" name="subject" placeholder="Subject (Optional)" aria-label="Subject" />
          </div>
        ) : (
          <>
            <input type="text" name="name" placeholder="Name" aria-label="Name" />
            <input type="email" name="email" placeholder="Email" aria-label="Email" />
          </>
        )}
        <textarea name="message" rows={6} placeholder={isEditorial ? 'Message' : 'Message'} aria-label="Message" />
        <button type="submit" className={isEditorial ? 'blog-detail-comment-btn' : 'red-btn'}>
          {isEditorial ? 'Post Comment' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
