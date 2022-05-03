export function addAverageRate(data) {
    return data.map(post => {
        let sum = 0;
        post.comments.forEach(comment => sum += comment.comment_rate);

        let averageRate = (sum / post.comments.length);
        return { ...post, averageRate };
    });
}

export function findMaxRatePost(posts) {
    const enabledPosts = posts.filter(post => !post.disabled);

    if (!enabledPosts.length) {
        return;
    }
    return enabledPosts.reduce((prev, current) => {
        return (+prev.averageRate > +current.averageRate) ? prev : current;
    })
}

export function sortPostsList(state) {
    const sortedList = [...state.list];

    if (state.sort) {
        sortedList.sort((a, b) => (a.rate - b.rate));
    } else {
        sortedList.sort((a, b) => (b.rate - a.rate));
    }

    return sortedList;
}