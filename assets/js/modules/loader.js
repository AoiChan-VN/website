export async function loadPosts() {

    try {

        const manifestRequest =
            await fetch(
                './data/manifest.json'
            );

        if (!manifestRequest.ok) {
            throw new Error(
                'Manifest load failed'
            );
        }

        const manifest =
            await manifestRequest.json();

        const requests =
            manifest.posts.map(
                async file => {

                    try {

                        const response =
                            await fetch(
                                `./data/posts/${file}`
                            );

                        if (!response.ok) {
                            return null;
                        }

                        return response.json();

                    } catch {

                        return null;

                    }

                }
            );

        const results =
            await Promise.all(requests);

        return results.filter(Boolean);

    } catch (error) {

        console.error(error);

        return [];

    }

}
