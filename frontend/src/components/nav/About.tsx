import * as React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ChevronDownIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

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
          <Link href="https://github.com/yang170/ShareAny" isExternal>
            {t("viewSource")}
            <ExternalLinkIcon marginLeft="1" />
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
});

export { About };
