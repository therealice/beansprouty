import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Navigator from '../components/navigator'
import Footer from '../components/footer'
import TopBar from '../components/topBar'
import BlogPost from '../components/blogPost'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const title = post.frontmatter.title || siteTitle

    return (
      <div>
        <Helmet title={title} />
        <TopBar title={title} pathContext={this.props.pathContext} />
        <BlogPost post={post} />
        <Footer />
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
        featuredImage {
          childImageSharp{
              sizes(maxWidth: 630) {
                  ...GatsbyImageSharpSizes
              }
          }
        }
      }
    }
  }
`
