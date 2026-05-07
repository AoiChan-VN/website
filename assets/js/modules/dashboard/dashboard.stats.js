export function calculateDashboardStats(
  repositories
) {

  return {

    repositories:
      repositories.length,

    totalStars:
      repositories.reduce(
        (total, repository) =>
          total + repository.stars,
        0
      )

  };

} 
