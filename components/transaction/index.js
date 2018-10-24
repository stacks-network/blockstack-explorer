import React from 'react';
import { Box, Type } from 'blockstack-ui';
import { Card } from '@components/card';
import { Section } from '@components/section';

import Link from 'next/link';

/**
 * Pass an object and set of keys and this will render subsections for each
 */
const generateAutomaticSections = (data, arr, params) => {
  const LinkWrapper = ({ query, ...rest }) => (
    <Link
      href={{
        pathname: `/${params.path}/single`,
        query: {
          [params.query]: query,
        },
      }}
      as={`/${params.path}/${query}`}
      prefetch
      passHref
      {...rest}
    />
  );
  return arr.map(
    (key, i) =>
      data[key] ? (
        <Section.Subsection label={key} key={i}>
          <Box maxWidth={'100%'} overflow="auto">
            {params ? (
              <LinkWrapper query={data[key]}>
                <Type is="a" fontFamily="brand">
                  {data[key]}
                </Type>
              </LinkWrapper>
            ) : (
              <Type fontFamily="brand">{data[key]}</Type>
            )}
          </Box>
        </Section.Subsection>
      ) : null,
  );
};

/**
 * Some latest transaction data
 *
 * Currently hidden because it might not be helpful
 */
const AutomatedSection = ({ iterable, ...rest }) => (
  <Section pb={4} {...rest}>
    {generateAutomaticSections(iterable, Object.keys(iterable))}
  </Section>
);

/**
 * Bring it all together now
 */
const TransactionCard = ({ transaction, ...rest }) => {
  const { vin, vout, id, ...iterable } = transaction;
  return (
    <Card title={`Transaction Information`} {...rest}>
      <AutomatedSection iterable={iterable} />
    </Card>
  );
};

export { TransactionCard };
