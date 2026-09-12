export default function BlogCommentForm() {
  return (
    <div className="comment-form">
      <div className="msg-heading">
        <span>Write a Message</span>
      </div>
      <form className="my-form" onSubmit={(event) => event.preventDefault()}>
        <input type="text" name="name" placeholder="Name" aria-label="Name" />
        <input type="email" name="email" placeholder="Email" aria-label="Email" />
        <textarea name="message" rows={6} placeholder="Message" aria-label="Message" />
        <button type="submit" className="red-btn">
          Submit
        </button>
      </form>
    </div>
  )
}
