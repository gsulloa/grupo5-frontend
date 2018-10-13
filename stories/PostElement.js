import React from "react"
import { storiesOf } from "@storybook/react"
import PostElement from "../src/components/PostList/PostElement"
import { theme } from "../src/withRoot"
import { muiTheme } from "storybook-addon-material-ui"

export default () => {
  storiesOf("PostElement", module)
    .addDecorator(muiTheme([theme]))
    .add("Empty post element", () => <PostElement />)
    .add("Normal post element", () => (
      <PostElement title="Titulo!" body="cuerpo del mensaje" />
    ))
    .add("Long post element", () => (
      <PostElement
        title="Titulo!"
        body={`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tristique turpis at porta laoreet. Aenean feugiat urna in finibus semper. Cras imperdiet eros nec euismod egestas. Pellentesque aliquet posuere urna, id aliquam ipsum tempus ac. Aenean in cursus est. Nulla vitae ex risus. Sed accumsan porta eros, fermentum interdum nunc facilisis et. Morbi gravida neque ipsum, id scelerisque nisi euismod eget. Fusce porttitor mauris nisi, vel mollis odio sagittis eget. Pellentesque pretium ultrices arcu, eu tristique massa rhoncus eget.
      
      Maecenas varius augue eu volutpat suscipit. Etiam vel vestibulum ante. Vestibulum sit amet tristique risus. Vivamus ultrices eget tellus non commodo. Maecenas feugiat, felis non dignissim faucibus, massa risus congue dui, et efficitur metus massa id odio. In aliquet orci ut risus blandit, nec porta ex finibus. Suspendisse lobortis aliquet dui vel eleifend. Duis libero elit, sagittis nec mollis vitae, dictum ac sem. Etiam vitae est neque. Aenean ornare at ex vel luctus. Pellentesque faucibus hendrerit magna, id venenatis arcu accumsan vitae. In ac imperdiet metus, quis ullamcorper velit. Nunc dapibus lorem ac libero aliquam placerat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris lacinia blandit magna, et facilisis urna imperdiet lacinia.
      
      Aenean sodales dignissim lacus, quis rhoncus dolor laoreet quis. Donec sed vestibulum diam, in rutrum ipsum. Suspendisse potenti. Sed sit amet hendrerit metus. Maecenas posuere gravida dolor et convallis. Pellentesque ac magna vel nisl euismod porttitor. Ut eu fermentum augue. Donec in finibus est, ut vulputate mi. Suspendisse porta, sapien sit amet porta ornare, nisl sapien sollicitudin dolor, non porttitor dolor diam nec ex. Aenean luctus dolor magna, eu luctus tortor pharetra eu. Etiam in ultricies lorem, et dignissim lacus. Morbi accumsan quis quam et cursus. Donec ligula augue, porta ut purus id, scelerisque porttitor mauris.
      
      Suspendisse iaculis euismod sapien scelerisque maximus. Vivamus efficitur non magna eget blandit. Integer feugiat tortor velit, nec dictum massa consectetur nec. Cras sit amet luctus lectus, id tempor leo. Ut eros lacus, tempor vitae risus elementum, venenatis interdum purus. Donec et scelerisque diam. Phasellus et urna libero. Cras fermentum hendrerit velit, sit amet congue quam tincidunt vel. Sed in blandit magna, vitae vulputate leo. Donec aliquet risus sit amet sollicitudin pellentesque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer elementum risus quis lacus commodo laoreet.
      
      Fusce sit amet dapibus enim, ut tincidunt nulla. Vestibulum id elit est. Etiam aliquam at velit id finibus. Proin a viverra urna. Sed vitae lectus bibendum, sollicitudin nisi eget, interdum libero. Etiam eu mi finibus, maximus massa at, tempor odio. Nunc ut libero ac diam blandit feugiat. Suspendisse ultricies ut elit non ornare. Maecenas semper urna quis nisl aliquam, blandit pretium mi pharetra. Morbi ac ante nibh. Nullam commodo magna metus. Etiam placerat neque nisl, ut mollis dui porttitor nec. Duis mi diam, venenatis a iaculis ac, venenatis et nisi.`}
      />
    ))
    .add("Selected element", () => (
      <PostElement title="Titulo!" body="cuerpo del mensaje" selected />
    ))
}
