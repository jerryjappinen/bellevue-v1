// import Vue from 'vue';
import { Comment, Post } from '@models';

describe('Post model', function () {

	it('should have empty comments list when none is passed', function () {

		// Set up a new instance of model
		var post = new Post({
			propsData: {
				id: 1,
				userId: 1
			}
		});

		// Expected results
		expect(post.comments).to.be.a('array');
		expect(post.comments.length).to.equal(0);

	});

	it('should have no title when none is passed', function () {
		var post = new Post({
			propsData: {
				id: 1,
				userId: 1
			}
		});
		expect(post.title).to.not.be.ok;
	});

	it('should have no body when none is passed', function () {
		var post = new Post({
			propsData: {
				id: 1,
				userId: 1
			}
		});
		expect(post.body).to.not.be.ok;
	});

	it('should have hasComments as false when none is passed', function () {
		var post = new Post({
			propsData: {
				id: 1,
				userId: 1
			}
		});
		expect(post.hasComments).to.not.be.ok;
	});

	it('should have hasComments as true when is passed', function () {
		var post = new Post({
			propsData: {
				id: 1,
				userId: 1,
				comments: [

					new Comment({
						propsData: {
							id: 1,
							postId: 1
						}
					})

				]
			}
		});
		expect(post.hasComments).to.be.ok;
	});

});
