import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Breadcrumb, Container, Segment } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { Icon } from '@plone/volto/components';
import { getBreadcrumbs } from '@plone/volto/actions';
import { getBaseUrl, hasApiExpander } from '@plone/volto/helpers';

import homeSVG from '@plone/volto/icons/home.svg';
import { useRoot } from '@plone/volto/hooks/breadcrumbs/useRoot';
import { useItems } from '@plone/volto/hooks/breadcrumbs/useItems';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
  breadcrumbs: {
    id: 'Breadcrumbs',
    defaultMessage: 'Breadcrumbs',
  },
});

const BreadcrumbsComponent = ({ pathname }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const items = useItems();
  const root = useRoot();

  useEffect(() => {
    if (!hasApiExpander('breadcrumbs', getBaseUrl(pathname))) {
      dispatch(getBreadcrumbs(getBaseUrl(pathname)));
    }
  }, [dispatch, pathname]);

  return (
    <Segment
      role="navigation"
      aria-label={intl.formatMessage(messages.breadcrumbs)}
      className="breadcrumbs"
      secondary
      vertical
    >
      <Container>
        <Breadcrumb>
          <Link
            to={root || '/'}
            className="section"
            title={intl.formatMessage(messages.home)}
          >
            <Icon name={homeSVG} size="18px" />
          </Link>
          {items.map((item, index, items) => [
            <Breadcrumb.Divider key={`divider-${item.url}`} />,
            index < items.length - 1 ? (
              <Link key={item.url} to={item.url} className="section">
                {item.title}
              </Link>
            ) : (
              <Breadcrumb.Section key={item.url} active>
                {item.title}
              </Breadcrumb.Section>
            ),
          ])}
        </Breadcrumb>
      </Container>
    </Segment>
  );
};

BreadcrumbsComponent.propTypes = {
  getBreadcrumbs: PropTypes.func,
  pathname: PropTypes.string,
  root: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
};

export default BreadcrumbsComponent;
