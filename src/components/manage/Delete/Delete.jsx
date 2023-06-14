import  { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import { useSelector,shallowEqual, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Button, Container, List, Segment } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl, useIntl } from 'react-intl';
import qs from 'query-string';

import { deleteContent, getContent } from '@plone/volto/actions';
import { Toolbar } from '@plone/volto/components';
import { useContent } from '@plone/volto/hooks/content/useContent';
const messages = defineMessages({
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
  ok: {
    id: 'Ok',
    defaultMessage: 'Ok',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
});


const Delete=({location,history})=> {

  const dispatch=useDispatch();
  const intl=useIntl();
  const [isClient,setisClient]=useState(false);
 
  

  const {content, deleteRequest } = useContent();
  
  const pathname=location.pathname;
  const returnUrl=qs.parse(location.search).return_url;

  useEffect(()=>{
    dispatch(getContent(pathname.split('/delete')[0]));
    setisClient(true);
  
   },[])
   
  useEffect(()=>{
    history.push(
      returnUrl ||
         pathname.replace('/delete', '').replace(/\/[^/]*$/, ''),
     );
  },[deleteRequest])


const onSubmit=()=> {
    dispatch(deleteContent(pathname.replace('/delete', '')));
  }

  const onCancel=()=> {
  history.push(pathname.replace('/delete', ''));
  }


    if (content) {
      return (
        <div id="page-delete">
          <Helmet title={intl.formatMessage(messages.delete)} />
          <Container>
            <Segment.Group raised>
              <Segment className="primary">
                <FormattedMessage
                  id="Do you really want to delete this item?"
                  defaultMessage="Do you really want to delete this item?"
                />
              </Segment>
              <Segment attached>
                <List bulleted>
                  <List.Item>{content.title}</List.Item>
                </List>
              </Segment>
              <Segment className="actions" clearing>
                <Button
                  basic
                  circular
                  primary
                  floated="right"
                  icon="arrow right"
                  aria-label={intl.formatMessage(messages.ok)}
                  title={intl.formatMessage(messages.ok)}
                  size="big"
                  onClick={onSubmit}
                />
                <Button
                  basic
                  circular
                  secondary
                  icon="remove"
                  aria-label={intl.formatMessage(messages.cancel)}
                  title={intl.formatMessage(messages.cancel)}
                  floated="right"
                  size="big"
                  onClick={onCancel}
                />
              </Segment>
            </Segment.Group>
          </Container>
          {isClient && (
            <Portal node={document.getElementById('toolbar')}>
              <Toolbar
                pathname={pathname}
                hideDefaultViewButtons
                inner={<span />}
              />
            </Portal>
          )}
        </div>
      );
    }
    return <div />;
  }

Delete.propTypes = {
  deleteContent: PropTypes.func,
  getContent: PropTypes.func,
  deleteRequest: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
  }),
  pathname: PropTypes.string,
  content: PropTypes.shape({
    title: PropTypes.string,
  }),
  returnUrl: PropTypes.string,
};


Delete.defaultProps = {
  content: null,
  returnUrl: null,
};
export default compose(
  withRouter,
)(Delete);
