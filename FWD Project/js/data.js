// Mock Data for the application

export const Difficulty = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard'
};

export const SubmissionStatus = {
  ACCEPTED: 'Accepted',
  WRONG_ANSWER: 'Wrong Answer',
  TIME_LIMIT_EXCEEDED: 'TLE',
  RUNTIME_ERROR: 'Runtime Error',
  COMPILATION_ERROR: 'Compilation Error',
  PENDING: 'Pending'
};

export const PROBLEMS = [
  {
    id: 'p1',
    title: 'Two Sum',
    difficulty: Difficulty.EASY,
    type: 'logic',
    tags: ['Array', 'Hash Table'],
    status: 'solved',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    inputFormat: 'The first line contains an integer N (size of array). The second line contains N space-separated integers. The third line contains the target integer.',
    outputFormat: 'Return the indices of the two numbers as an array [i, j].',
    constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9',
    sampleTestCases: [
      { input: '4\n2 7 11 15\n9', output: '[0, 1]' },
      { input: '3\n3 2 4\n6', output: '[1, 2]' }
    ]
  },
  {
    id: 'web-1',
    title: 'Interactive Profile Card',
    difficulty: Difficulty.EASY,
    type: 'web',
    tags: ['HTML', 'CSS', 'JavaScript'],
    status: 'unsolved',
    description: 'Create a responsive profile card that displays a user avatar, name, and bio. When the user clicks a "Follow" button, the button text should change to "Following" and its background color should change.',
    inputFormat: 'No standard input. Use HTML/CSS/JS editors.',
    outputFormat: 'Visual rendering of the card with interactive states.',
    constraints: 'Card must be centered.\nMust use standard HTML5 tags.\nJavascript must handle the click event.',
    sampleTestCases: []
  },
  {
    id: 'p2',
    title: 'Merge Sorted Lists',
    difficulty: Difficulty.MEDIUM,
    type: 'logic',
    tags: ['Linked List', 'Recursion'],
    status: 'attempted',
    description: 'Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.',
    inputFormat: 'Two space separated lines representing the linked list nodes.',
    outputFormat: 'A single line containing the merged sorted list values.',
    constraints: 'The number of nodes in both lists is in the range [0, 50].\n-100 <= Node.val <= 100',
    sampleTestCases: [
      { input: '1 2 4\n1 3 4', output: '1 1 2 3 4 4' }
    ]
  },
  {
    id: 'web-2',
    title: 'Dynamic To-Do List',
    difficulty: Difficulty.MEDIUM,
    type: 'web',
    tags: ['DOM Manipulation', 'CSS Grid', 'Interactivity'],
    status: 'unsolved',
    description: 'Build a to-do list application where users can add tasks, mark them as complete (strike-through), and delete tasks. The layout should be modern and use CSS Flexbox or Grid.',
    inputFormat: 'Web environment.',
    outputFormat: 'Fully functional dynamic list.',
    constraints: 'Persistent storage is not required.\nUse semantic HTML.',
    sampleTestCases: []
  },
  {
    id: 'p3',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: Difficulty.HARD,
    type: 'logic',
    tags: ['Tree', 'Dynamic Programming', 'DFS'],
    status: 'unsolved',
    description: 'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Find the maximum path sum of any non-empty path.',
    inputFormat: 'Level-order traversal of the binary tree.',
    outputFormat: 'The maximum path sum integer.',
    constraints: 'The number of nodes in the tree is in the range [1, 3 * 10^4].\n-1000 <= Node.val <= 1000',
    sampleTestCases: [
      { input: '1 2 3', output: '6' },
      { input: '-10 9 20 null null 15 7', output: '42' }
    ]
  }
];

export const SUBMISSIONS = [
  {
    id: 's1',
    problemId: 'p1',
    problemTitle: 'Two Sum',
    status: SubmissionStatus.ACCEPTED,
    runtime: '54ms',
    memory: '42.1MB',
    timestamp: '2024-05-15 14:30',
    language: 'JavaScript',
    code: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n}'
  }
];

export const LEADERBOARD = [
  { rank: 1, username: 'code_wizard', solved: 450, rating: 2850 },
  { rank: 2, username: 'algo_master', solved: 432, rating: 2790 },
  { rank: 3, username: 'binary_beast', solved: 410, rating: 2715 }
];
