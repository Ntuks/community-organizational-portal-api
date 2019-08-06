/* eslint-disable class-methods-use-this */
class Post {
  constructor(
    description,
    tagline,
    areasOfEngagement,
    affiliates,
    facebookPageLink,
    location,
    status,
    contactNumber,
    profilePicture
  ) {
    this._description = description;
    this._tagline = tagline;
    this._areasOfEngagement = areasOfEngagement;
    this._affiliates = affiliates;
    this._facebookPageLink = facebookPageLink;
    this._location = location;
    this._status = status;
    this._contactNumber = contactNumber;
    this._profilePicture = profilePicture;
  }

  createPost() {
    //
  }

  updatePost() {}

  deletePost() {}

  /**
   * @returns {any}
   */
  get Post() {
    const post = new Post();
    return post;
  }
}

module.exports = Post;
