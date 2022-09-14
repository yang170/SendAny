import { ChevronDownIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

const About = React.memo((): JSX.Element => {
  const { t } = useTranslation("nav");
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        minWidth="-webkit-fit-content"
      >
        {t("about")}
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Link as={RouterLink} to="privacy">
            {t("privacy")}
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="https://github.com/yang170/share-any" isExternal>
            {t("viewSource")}
            <ExternalLinkIcon marginLeft="1" />
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
});

export { About };
