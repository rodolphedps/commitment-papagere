import { secureAvatarUrlFromJs } from 'utils/avatars';
import { getColorThemeBackgroundFromJs } from 'utils/styleHelper';

export const handleConnectedPeopleDataFormatting = (connectedPeople) => {
  const {
    cares,
    children,
    nannies,
    users
  } = connectedPeople;

  if (children) {
    connectedPeople.children = children
      .map((child) => ({
        ...child,
        isChild: true,
        avatarUrl: secureAvatarUrlFromJs(child),
        backgroundTheme: getColorThemeBackgroundFromJs(child)
      }));
  } else {
    connectedPeople.children = [];
  }

  if (nannies) {
    connectedPeople.nannies = nannies
      .map((nanny) => ({
        ...nanny,
        isNanny: true,
        avatarUrl: secureAvatarUrlFromJs(nanny),
        backgroundTheme: getColorThemeBackgroundFromJs(nanny)
      }));
  } else {
    connectedPeople.nannies = [];
  }

  if (users) {
    connectedPeople.users = users
      .map((user) => ({
        ...user,
        isUser: true,
        avatarUrl: secureAvatarUrlFromJs(user),
        backgroundTheme: getColorThemeBackgroundFromJs(user)
      }));
  } else {
    connectedPeople.users = [];
  }

  if (cares) {
    connectedPeople.cares = cares
      .map((care) => {
        // pre-process props used for displaying the care
        const child = connectedPeople.children.find((c) => c.id === care.child_id);
        const nanny = connectedPeople.nannies.find((n) => n.id === care.nanny_id);
        const childHasMultipleCares = cares.filter((c) => c.child_id === care.child_id).length > 1;

        const formattedCare = {
          ...care,
          isCare: true,
          child,
          nanny,
          childHasMultipleCares,
          stylingProps: {
            // props used for avatars and styles (same as for children)
            child_color: care.color,
            first_name: child.first_name,
            last_name: child.last_name,
          },
        };

        formattedCare.stylingProps.backgroundTheme = getColorThemeBackgroundFromJs(formattedCare.stylingProps);
        formattedCare.stylingProps.avatarUrl = secureAvatarUrlFromJs(formattedCare.stylingProps);
        return formattedCare;
      });
  } else {
    connectedPeople.cares = [];
  }
};
