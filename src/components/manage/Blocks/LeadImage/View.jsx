/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import Image from '@plone/volto/components/theme/Image/Image';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data, properties }) => (
  <p
    className={cx(
      'block image align',
      {
        center: !Boolean(data.align),
      },
      data.align,
    )}
  >
    {properties.image && (
      <>
        {(() => {
          const image = (
            <Image
              image={properties.image}
              alt={properties.image_caption}
              className={cx({ 'full-width': data.align === 'full' })}
            />
          );
          if (data.href) {
            return (
              <UniversalLink
                href={data.href}
                openLinkInNewTab={data.openLinkInNewTab}
              >
                {image}
              </UniversalLink>
            );
          } else {
            return image;
          }
        })()}
      </>
    )}
  </p>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
