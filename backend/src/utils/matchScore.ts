export const calculateMatchScore = (
    userSkills: string[], requiredSkills: string[]
) : number => {

    if(requiredSkills.length === 0) return 0;

    const matchSkills = requiredSkills.filter(required => userSkills.some(userSkill => userSkill.toLowerCase() === required.toLowerCase()));

    return Math.round((matchSkills.length/requiredSkills.length) * 100)
}