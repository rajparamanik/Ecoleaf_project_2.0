import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Heart, MessageCircle, Calendar, User, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (replace with your own keys)
const supabaseUrl = 'https://glbdsgtirpxixzzhzqnq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsYmRzZ3RpcnB4aXh6emh6cW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMDAyNDcsImV4cCI6MjA2NDY3NjI0N30.7nCluEwl2eqlcAMcnxc2oFPxCsFXIarzkM70B52nddg';
const supabase = createClient(supabaseUrl, supabaseKey);

// Define Post type to include userComments
type Post = {
	id: number;
	user: {
		id: string;
		name: string;
		avatar: null;
	};
	content: string;
	image: string | null;
	createdAt: string;
	likes: number;
	comments: number;
	userComments: string[];
};

// Mocked data for posts
const mockPosts: Post[] = [
	{
		id: 1,
		user: {
			id: '2',
			name: 'Jane Smith',
			avatar: null,
		},
		content:
			'Just planted my first oak tree! So excited to watch it grow over the years. Anyone have tips for caring for young oak trees?',
		image:
			'https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		createdAt: '2025-06-02T12:00:00Z',
		likes: 15,
		comments: 5,
		userComments: [],
	},
	{
		id: 2,
		user: {
			id: '3',
			name: 'Michael Johnson',
			avatar: null,
		},
		content:
			"Walking through the redwood forest today. These giants are over 2,000 years old! It's humbling to stand among living beings that have been around for so long.",
		image:
			'https://images.pexels.com/photos/789857/pexels-photo-789857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		createdAt: '2025-06-01T15:30:00Z',
		likes: 42,
		comments: 7,
		userComments: [],
	},
	{
		id: 3,
		user: {
			id: '4',
			name: 'Emily Davis',
			avatar: null,
		},
		content:
			"Did you know that trees communicate with each other through a network of fungi in the soil? They can share nutrients and even warn each other about threats!",
		image: null,
		createdAt: '2025-05-30T09:15:00Z',
		likes: 28,
		comments: 12,
		userComments: [],
	},
	{
		id: 4,
		user: {
			id: '1',
			name: 'John Doe',
			avatar: null,
		},
		content:
			"Our community tree planting event was a huge success! We planted 50 native trees in the local park. Thanks to everyone who came out and helped!",
		image:
			'https://images.pexels.com/photos/2421440/pexels-photo-2421440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		createdAt: '2025-05-29T14:45:00Z',
		likes: 36,
		comments: 8,
		userComments: [],
	},
];

const Community = () => {
	const [posts, setPosts] = useState<Post[]>(mockPosts);
	const [newPostContent, setNewPostContent] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { user, isAuthenticated } = useAuth();
	const [filter, setFilter] = useState('latest');
	const [photoUrl, setPhotoUrl] = useState<string>('');
	const [photoFile, setPhotoFile] = useState<File | null>(null);
	const [photoPreview, setPhotoPreview] = useState<string | null>(null);

	// Preview selected image file
	useEffect(() => {
		if (photoFile) {
			const reader = new FileReader();
			reader.onloadend = () => setPhotoPreview(reader.result as string);
			reader.readAsDataURL(photoFile);
		} else {
			setPhotoPreview(null);
		}
	}, [photoFile]);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setPhotoFile(file);
		setPhotoUrl('');
	};

	// Load posts from Supabase on mount and merge with mockPosts
	useEffect(() => {
		const fetchPosts = async () => {
			const { data, error } = await supabase
				.from('community_posts')
				.select('id,user_id,user_name,user_avatar,content,image,created_at,likes,comments,user_comments')
				.order('created_at', { ascending: false });
			if (!error && data) {
				const supabasePosts = data.map((row: any) => ({
					id: row.id,
					user: {
						id: row.user_id,
						name: row.user_name,
						avatar: row.user_avatar || null,
					},
					content: row.content,
					image: row.image,
					createdAt: row.created_at,
					likes: row.likes || 0,
					comments: row.comments || 0,
					userComments: row.user_comments || [],
				}));
				// Merge: Supabase posts first, then mockPosts that are not in Supabase
				const supabaseIds = new Set(supabasePosts.map(p => p.id));
				const merged = [
					...supabasePosts,
					...mockPosts.filter(mp => !supabaseIds.has(mp.id)),
				];
				setPosts(merged);
			} else {
				setPosts(mockPosts);
			}
		};
		fetchPosts();
	}, [user]);

	const handleCreatePost = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!newPostContent.trim()) {
			toast.error('Post content cannot be empty');
			return;
		}
		if (photoUrl && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(photoUrl)) {
			toast.error('Please enter a valid image URL (jpg, png, gif, webp)');
			return;
		}

		setIsSubmitting(true);

		try {
			let image: string | null = null;
			if (photoFile) {
				const fileExt = photoFile.name.split('.').pop();
				const fileName = `${Date.now()}-${user!.id}.${fileExt}`;
				const { data: uploadData, error: uploadError } = await supabase.storage
					.from('community-images')
					.upload(fileName, photoFile, { upsert: true });
				if (!uploadError && uploadData) {
					const { publicUrl } = supabase.storage.from('community-images').getPublicUrl(fileName).data;
					image = publicUrl;
				} else if (photoPreview) {
					image = photoPreview;
				}
			} else if (photoUrl) {
				image = photoUrl;
			}

			// --- Debug: Log user and post data before insert ---
			console.log('Creating post with:', {
				user_id: user?.id,
				user_name: user?.name,
				image,
				content: newPostContent,
			});

			const { data, error } = await supabase
				.from('community_posts')
				.insert([
					{
						user_id: user?.id,
						user_name: user?.name,
						user_avatar: null,
						content: newPostContent,
						image,
						created_at: new Date().toISOString(),
						likes: 0,
						comments: 0,
						user_comments: [],
					},
				])
				.select();

			if (error) {
				console.error('Supabase insert error:', error);
				toast.error('Failed to create post: ' + error.message);
				setIsSubmitting(false);
				return;
			}
			if (!data || !data[0]) {
				console.error('Supabase insert returned no data:', data);
				toast.error('Failed to create post. No data returned.');
				setIsSubmitting(false);
				return;
			}

			const newPost = {
				id: data[0].id,
				user: {
					id: user!.id,
					name: user!.name,
					avatar: null,
				},
				content: newPostContent,
				image,
				createdAt: data[0].created_at,
				likes: 0,
				comments: 0,
				userComments: [],
			};

			setPosts([newPost, ...posts]);
			setNewPostContent('');
			setPhotoUrl('');
			setPhotoFile(null);
			setPhotoPreview(null);
			toast.success('Post created successfully!');
		} catch (error) {
			console.error('Create post error:', error);
			toast.error('Failed to create post. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	// Persist likes and comments in localStorage per user
	useEffect(() => {
		if (user) {
			const userData = localStorage.getItem(`community_user_data_${user.id}`);
			if (userData) {
				try {
					const parsed = JSON.parse(userData);
					setPosts((prevPosts) =>
						prevPosts.map((post) => {
							const updated = { ...post };
							if (parsed.likes && parsed.likes[post.id] !== undefined) {
								updated.likes = parsed.likes[post.id];
							}
							if (parsed.comments && parsed.comments[post.id] !== undefined) {
								updated.comments = parsed.comments[post.id];
							}
							if (parsed.userComments && parsed.userComments[post.id]) {
								updated.userComments = parsed.userComments[post.id];
							}
							return updated;
						})
					);
				} catch {
					// ignore parse error
				}
			}
		}
	}, [user]);

	useEffect(() => {
		if (user) {
			const likes: Record<number, number> = {};
			const comments: Record<number, number> = {};
			const userComments: Record<number, string[]> = {};
			posts.forEach((post) => {
				likes[post.id] = post.likes;
				comments[post.id] = post.comments;
				if (post.userComments) userComments[post.id] = post.userComments;
			});
			localStorage.setItem(
				`community_user_data_${user.id}`,
				JSON.stringify({ likes, comments, userComments })
			);
		}
	}, [posts, user]);

	// Add a state for comment input per post
	const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});

	const handleCommentInput = (postId: number, value: string) => {
		setCommentInputs((prev) => ({ ...prev, [postId]: value }));
	};

	const handleLike = async (postId: number) => {
		if (!isAuthenticated) {
			toast.error('Please log in to like posts');
			return;
		}
		const post = posts.find((p) => p.id === postId);
		if (!post) return;

		const updatedLikes = post.likes + 1;

		setPosts(
			posts.map((p) =>
				p.id === postId ? { ...p, likes: updatedLikes } : p
			)
		);

		// Save like to Supabase for both mock and Supabase posts
		await supabase
			.from('community_posts')
			.update({ likes: updatedLikes })
			.eq('id', postId);
	};

	const handleAddComment = async (postId: number) => {
		const comment = commentInputs[postId]?.trim();
		if (!comment) return;
		const post = posts.find((p) => p.id === postId);
		if (!post) return;

		const updatedUserComments = [...(post.userComments || []), comment];
		const updatedCommentsCount = post.comments + 1;

		setPosts((prevPosts) =>
			prevPosts.map((p) =>
				p.id === postId
					? { ...p, comments: updatedCommentsCount, userComments: updatedUserComments }
					: p
			)
		);
		setCommentInputs((prev) => ({ ...prev, [postId]: '' }));

		// Save comment for both mock and Supabase posts
		await supabase
			.from('community_posts')
			.update({
				user_comments: updatedUserComments,
				comments: updatedCommentsCount,
			})
			.eq('id', postId);
	};

	// Save likes/comments to localStorage on change
	useEffect(() => {
		if (user) {
			const likes: Record<number, number> = {};
			const comments: Record<number, number> = {};
			posts.forEach((post) => {
				likes[post.id] = post.likes;
				comments[post.id] = post.comments;
			});
			localStorage.setItem(
				`community_user_data_${user.id}`,
				JSON.stringify({ likes, comments })
			);
		}
	}, [posts, user]);

	const handleFilter = (filterType: string) => {
		setFilter(filterType);

		if (filterType === 'latest') {
			setPosts(
				([...posts] as typeof posts).sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				)
			);
		} else if (filterType === 'popular') {
			setPosts([...posts].sort((a, b) => b.likes - a.likes));
		}
	};

	return (
		<div className="bg-gray-50 min-h-screen pb-12">
			<div className="bg-primary text-white py-12">
				<div className="container">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">Community</h1>
					<p className="text-xl">
						Connect with tree enthusiasts, share your knowledge, and learn from
						others.
					</p>
				</div>
			</div>

			<div className="container mt-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main content */}
					<div className="lg:col-span-2 space-y-6">
						{/* Create post */}
						{isAuthenticated ? (
							<Card>
								<Card.Body>
									<h3 className="font-semibold mb-4">Create a Post</h3>
									<form onSubmit={handleCreatePost}>
										<div className="mb-4">
											<textarea
												className="w-full border border-gray-300 rounded-md p-3 focus:ring-primary focus:border-primary"
												rows={3}
												placeholder="Share your thoughts, questions, or tree experiences..."
												value={newPostContent}
												onChange={(e) => setNewPostContent(e.target.value)}
											></textarea>
										</div>
										<div className="mb-4 flex flex-col gap-2">
											<label className="block text-sm font-medium text-gray-700">
												Attach a photo (optional)
											</label>
											<input
												type="file"
												accept="image/*"
												onChange={handlePhotoChange}
												className="block"
											/>
											<span className="text-xs text-gray-500">
												or paste an image URL below
											</span>
											<input
												type="url"
												className="w-full border border-gray-300 rounded-md p-3 focus:ring-primary focus:border-primary"
												placeholder="Paste an image URL (jpg, png, gif, webp)"
												value={photoUrl}
												onChange={(e) => {
													setPhotoUrl(e.target.value);
													setPhotoFile(null);
													setPhotoPreview(null);
												}}
											/>
											{photoPreview && (
												<img
													src={photoPreview}
													alt="Preview"
													className="mt-2 rounded max-h-48"
													style={{ objectFit: 'cover' }}
												/>
											)}
										</div>
										<div className="flex justify-end">
											<Button
												type="submit"
												variant="primary"
												isLoading={isSubmitting}
												icon={<Send />}
											>
												Post
											</Button>
										</div>
									</form>
								</Card.Body>
							</Card>
						) : (
							<Card>
								<Card.Body className="text-center py-8">
									<h3 className="text-xl font-semibold mb-4">
										Join the Conversation
									</h3>
									<p className="text-gray-600 mb-6">
										Sign in to share your thoughts and connect with tree
										enthusiasts.
									</p>
									<div className="flex justify-center gap-4">
										<Link to="/login">
											<Button variant="primary">Sign In</Button>
										</Link>
										<Link to="/register">
											<Button variant="outline">Create Account</Button>
										</Link>
									</div>
								</Card.Body>
							</Card>
						)}

						{/* Posts filter */}
						<div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
							<h2 className="font-semibold">Posts</h2>
							<div className="flex items-center">
								<Filter className="h-4 w-4 text-gray-500 mr-2" />
								<select
									className="text-sm border-0 focus:ring-0"
									value={filter}
									onChange={(e) => handleFilter(e.target.value)}
								>
									<option value="latest">Latest</option>
									<option value="popular">Popular</option>
								</select>
							</div>
						</div>

						{/* Posts */}
						{posts.map((post) => (
							<Card key={post.id}>
								<Card.Body>
									<div className="flex items-center mb-4">
										<div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center mr-3">
											{post.user.name.charAt(0)}
										</div>
										<div>
											<h3 className="font-medium">{post.user.name}</h3>
											<div className="text-sm text-gray-500 flex items-center">
												<Calendar className="h-3 w-3 mr-1" />
												{formatDate(post.createdAt)}
											</div>
										</div>
									</div>
									<p className="mb-4">{post.content}</p>
									{post.image && (
										<div className="mb-4 rounded-lg overflow-hidden">
											<img
												src={post.image}
												alt="Post"
												className="w-full"
												style={{ maxHeight: 400, objectFit: 'cover' }}
											/>
										</div>
									)}
									<div className="flex items-center pt-4 border-t border-gray-100">
										<button
											onClick={() => handleLike(post.id)}
											className="flex items-center mr-6 text-gray-600 hover:text-red-500"
										>
											<Heart className="h-5 w-5 mr-1" />
											<span>{post.likes}</span>
										</button>
										<button className="flex items-center text-gray-600 hover:text-primary">
											<MessageCircle className="h-5 w-5 mr-1" />
											<span>{post.comments}</span>
										</button>
									</div>
									{/* Comment input and list */}
									<div className="mt-4">
										{isAuthenticated && (
											<form
												onSubmit={(e) => {
													e.preventDefault();
													handleAddComment(post.id);
												}}
												className="flex gap-2 mb-2"
											>
												<input
													type="text"
													className="flex-1 border rounded px-2 py-1"
													placeholder="Add a comment..."
													value={commentInputs[post.id] || ''}
													onChange={(e) => handleCommentInput(post.id, e.target.value)}
												/>
												<Button type="submit" size="sm" variant="primary">
													Post
												</Button>
											</form>
										)}
										{post.userComments && post.userComments.length > 0 && (
											<ul className="pl-2 text-sm text-gray-700">
												{post.userComments.map((c, idx) => (
													<li key={idx} className="mb-1">
														{c}
													</li>
												))}
											</ul>
										)}
									</div>
								</Card.Body>
							</Card>
						))}
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* About Community */}
						<Card>
							<Card.Body>
								<h3 className="font-semibold mb-3">About Community</h3>
								<p className="text-gray-600 mb-4">
									A place to share your knowledge about trees, ask questions,
									and connect with fellow tree enthusiasts.
								</p>
								<div className="flex items-center text-gray-600 mb-2">
									<User className="h-4 w-4 mr-2" />
									<span>125 members</span>
								</div>
								<div className="flex items-center text-gray-600">
									<Calendar className="h-4 w-4 mr-2" />
									<span>Created Jan 2025</span>
								</div>
							</Card.Body>
						</Card>

						{/* Community Guidelines */}
						<Card>
							<Card.Body>
								<h3 className="font-semibold mb-3">Community Guidelines</h3>
								<ul className="space-y-2 text-gray-600">
									<li className="flex items-start">
										<span className="text-primary mr-2">•</span>
										Be respectful and kind to other members
									</li>
									<li className="flex items-start">
										<span className="text-primary mr-2">•</span>
										Share accurate information about trees
									</li>
									<li className="flex items-start">
										<span className="text-primary mr-2">•</span>
										No spam or self-promotion
									</li>
									<li className="flex items-start">
										<span className="text-primary mr-2">•</span>
										Use appropriate language
									</li>
								</ul>
							</Card.Body>
						</Card>

						{/* Upcoming Events */}
						<Card>
							<Card.Body>
								<h3 className="font-semibold mb-3">Upcoming Events</h3>
								<div className="space-y-4">
									<div>
										<h4 className="font-medium">Tree Planting Weekend</h4>
										<p className="text-sm text-gray-600 mb-1">
											July 15-16, 2025
										</p>
										<p className="text-sm text-gray-600">
											Join us in planting trees in local parks and green spaces.
										</p>
									</div>
									<div>
										<h4 className="font-medium">Tree Identification Workshop</h4>
										<p className="text-sm text-gray-600 mb-1">
											August 5, 2025
										</p>
										<p className="text-sm text-gray-600">
											Learn how to identify common tree species in your area.
										</p>
									</div>
								</div>
							</Card.Body>
							<Card.Footer>
								<a
									href="#"
									className="text-primary font-medium hover:underline"
								>
									View all events
								</a>
							</Card.Footer>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Community;