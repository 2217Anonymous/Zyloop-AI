export default function ContentState({ loading, error, empty, emptyMessage = 'No content available.' }) {
  if (loading) {
    return <div className="content-state content-state-loading">{loading}</div>
  }

  if (error) {
    return <div className="content-state content-state-error">{error}</div>
  }

  if (empty) {
    return <div className="content-state content-state-empty">{emptyMessage}</div>
  }

  return null
}
