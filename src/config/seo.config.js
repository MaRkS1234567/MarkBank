const SITE_NAME = 'MARK Bank'

export const getTitle = (title) => {
    return title ? `${title} | ${SITE_NAME}` : SITE_NAME
}