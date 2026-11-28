// LESSON 2.1: Flexbox Fundamentals
// Real-world context: Product list layouts

import { View, Text, StyleSheet, ScrollView } from "react-native";

// ============================================
// EXAMPLE 1: Understanding Flex Direction
// ============================================
const FlexDirectionDemo = () => {
  return (
    <View style={styles.demoContainer}>
      <Text style={styles.title}>flexDirection Examples</Text>

      {/* Column (Default) - Vertical stacking */}
      <View style={styles.exampleBox}>
        <Text style={styles.label}>flexDirection: 'column' (default)</Text>
        <View style={[styles.container, styles.column]}>
          <View style={[styles.box, styles.box1]}>
            <Text>1</Text>
          </View>
          <View style={[styles.box, styles.box2]}>
            <Text>2</Text>
          </View>
          <View style={[styles.box, styles.box3]}>
            <Text>3</Text>
          </View>
        </View>
      </View>

      {/* Row - Horizontal stacking */}
      <View style={styles.exampleBox}>
        <Text style={styles.label}>flexDirection: 'row'</Text>
        <View style={[styles.container, styles.row]}>
          <View style={[styles.box, styles.box1]}>
            <Text>1</Text>
          </View>
          <View style={[styles.box, styles.box2]}>
            <Text>2</Text>
          </View>
          <View style={[styles.box, styles.box3]}>
            <Text>3</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// ============================================
// EXAMPLE 2: JustifyContent (Main Axis)
// ============================================
const JustifyContentDemo = () => {
  return (
    <View style={styles.demoContainer}>
      <Text style={styles.title}>justifyContent (Main Axis Distribution)</Text>

      {/* Flex Start */}
      <View style={styles.exampleBox}>
        <Text style={styles.label}>justifyContent: 'flex-start'</Text>
        <View style={[styles.container, styles.row, styles.justifyStart]}>
          <View style={styles.smallBox}>
            <Text>1</Text>
          </View>
          <View style={styles.smallBox}>
            <Text>2</Text>
          </View>
          <View style={styles.smallBox}>
            <Text>3</Text>
          </View>
        </View>
      </View>

      {/* Center */}
      <View style={styles.exampleBox}>
        <Text style={styles.label}>justifyContent: 'center'</Text>
        <View style={[styles.container, styles.row, styles.justifyCenter]}>
          <View style={styles.smallBox}>
            <Text>1</Text>
          </View>
          <View style={styles.smallBox}>
            <Text>2</Text>
          </View>
          <View style={styles.smallBox}>
            <Text>3</Text>
          </View>
        </View>
      </View>

      {/* Space Between */}
      <View style={styles.exampleBox}>
        <Text style={styles.label}>justifyContent: 'space-between'</Text>
        <View style={[styles.container, styles.row, styles.justifyBetween]}>
          <View style={styles.smallBox}>
            <Text>1</Text>
          </View>
          <View style={styles.smallBox}>
            <Text>2</Text>
          </View>
          <View style={styles.smallBox}>
            <Text>3</Text>
          </View>
        </View>
      </View>

      {/* Space Around */}
      <View style={styles.exampleBox}>
        <Text style={styles.label}>justifyContent: 'space-around'</Text>
        <View style={[styles.container, styles.row, styles.justifyAround]}>
          <View style={styles.smallBox}>
            <Text>1</Text>
          </View>
          <View style={styles.smallBox}>
            <Text>2</Text>
          </View>
          <View style={styles.smallBox}>
            <Text>3</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// ============================================
// EXAMPLE 3: AlignItems (Cross Axis)
// ============================================
const AlignItemsDemo = () => {
  return (
    <View style={styles.demoContainer}>
      <Text style={styles.title}>alignItems (Cross Axis Alignment)</Text>

      {/* Stretch (Default) */}
      <View style={styles.exampleBox}>
        <Text style={styles.label}>alignItems: 'stretch'</Text>
        <View style={[styles.tallContainer, styles.row, styles.alignStretch]}>
          <View style={styles.smallBox}>
            <Text>1</Text>
          </View>
          <View style={styles.smallBox}>
            <Text>2</Text>
          </View>
          <View style={styles.smallBox}>
            <Text>3</Text>
          </View>
        </View>
      </View>

      {/* Center */}
      <View style={styles.exampleBox}>
        <Text style={styles.label}>alignItems: 'center'</Text>
        <View style={[styles.tallContainer, styles.row, styles.alignCenter]}>
          <View style={styles.smallBox}>
            <Text>1</Text>
          </View>
          <View style={styles.smallBox}>
            <Text>2</Text>
          </View>
          <View style={styles.smallBox}>
            <Text>3</Text>
          </View>
        </View>
      </View>

      {/* Flex End */}
      <View style={styles.exampleBox}>
        <Text style={styles.label}>alignItems: 'flex-end'</Text>
        <View style={[styles.tallContainer, styles.row, styles.alignEnd]}>
          <View style={styles.smallBox}>
            <Text>1</Text>
          </View>
          <View style={styles.smallBox}>
            <Text>2</Text>
          </View>
          <View style={styles.smallBox}>
            <Text>3</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// ============================================
// EXAMPLE 4: Flex Property (Sizing)
// ============================================
const FlexSizingDemo = () => {
  return (
    <View style={styles.demoContainer}>
      <Text style={styles.title}>flex Property (Proportional Sizing)</Text>

      {/* Equal Distribution */}
      <View style={styles.exampleBox}>
        <Text style={styles.label}>Equal: flex: 1 for all</Text>
        <View style={[styles.container, styles.row]}>
          <View style={[styles.flexBox, styles.flex1, styles.box1]}>
            <Text style={styles.flexText}>flex: 1</Text>
          </View>
          <View style={[styles.flexBox, styles.flex1, styles.box2]}>
            <Text style={styles.flexText}>flex: 1</Text>
          </View>
          <View style={[styles.flexBox, styles.flex1, styles.box3]}>
            <Text style={styles.flexText}>flex: 1</Text>
          </View>
        </View>
      </View>

      {/* Proportional Distribution */}
      <View style={styles.exampleBox}>
        <Text style={styles.label}>Proportional: 1, 2, 1</Text>
        <View style={[styles.container, styles.row]}>
          <View style={[styles.flexBox, styles.flex1, styles.box1]}>
            <Text style={styles.flexText}>flex: 1</Text>
          </View>
          <View style={[styles.flexBox, styles.flex2, styles.box2]}>
            <Text style={styles.flexText}>flex: 2</Text>
          </View>
          <View style={[styles.flexBox, styles.flex1, styles.box3]}>
            <Text style={styles.flexText}>flex: 1</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "#dee3e7",
          padding: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>
          flexDirection Examples
        </Text>
        <View style={{ padding: 20, backgroundColor: "#fff", borderRadius: 8 }}>
          <Text style={{ marginBottom: 10, color: "#555" }}>
            flexDirection: "column"
          </Text>
          <View
            style={{
              flexDirection: "column",
              padding: 10,
              backgroundColor: "#d7d7d7ff",
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: "green",
                alignItems: "center",
                justifyContent: "center",
                margin: 5,
              }}
            >
              <Text>1</Text>
            </View>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: "red",
                alignItems: "center",
                justifyContent: "center",
                margin: 5,
                borderRadius: 8,
              }}
            >
              <Text>2</Text>
            </View>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: "blue",
                alignItems: "center",
                justifyContent: "center",
                margin: 5,
                borderRadius: 8,
              }}
            >
              <Text>3</Text>
            </View>
          </View>
        </View>
      </View>

      <FlexDirectionDemo />
      <JustifyContentDemo />
      <AlignItemsDemo />
      <FlexSizingDemo />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  demoContainer: {
    padding: 20,
    backgroundColor: "#ecf0f1",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },
  exampleBox: {
    marginBottom: 25,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 10,
    fontWeight: "600",
  },

  // ============ CONTAINERS ============
  container: {
    backgroundColor: "#bdc3c7",
    padding: 10,
    minHeight: 80,
  },
  tallContainer: {
    backgroundColor: "#bdc3c7",
    padding: 10,
    height: 120,
  },

  // ============ FLEX DIRECTION ============
  column: {
    flexDirection: "column", // Default: Stack vertically
  },
  row: {
    flexDirection: "row", // Stack horizontally
  },

  // ============ JUSTIFY CONTENT ============
  justifyStart: {
    justifyContent: "flex-start", // Items at start (left/top)
  },
  justifyCenter: {
    justifyContent: "center", // Items centered
  },
  justifyBetween: {
    justifyContent: "space-between", // Space between items
  },
  justifyAround: {
    justifyContent: "space-around", // Space around items
  },

  // ============ ALIGN ITEMS ============
  alignStretch: {
    alignItems: "stretch", // Stretch to fill (default)
  },
  alignCenter: {
    alignItems: "center", // Center on cross axis
  },
  alignEnd: {
    alignItems: "flex-end", // Align to end
  },

  // ============ BOXES ============
  box: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  smallBox: {
    width: 50,
    height: 50,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  box1: {
    backgroundColor: "#e74c3c",
  },
  box2: {
    backgroundColor: "#3498db",
  },
  box3: {
    backgroundColor: "#2ecc71",
  },

  // ============ FLEX SIZING ============
  flexBox: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    minHeight: 60,
  },
  flex1: {
    flex: 1, // Takes 1 part of available space
  },
  flex2: {
    flex: 2, // Takes 2 parts of available space
  },
  flexText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

/* 

KEY CONCEPTS TO EMPHASIZE:
==========================

1. MAIN AXIS vs CROSS AXIS:
   -------------------------
   - Main Axis: Direction of flexDirection
     * column → Main axis is VERTICAL
     * row → Main axis is HORIZONTAL
   
   - Cross Axis: Perpendicular to main axis
     * column → Cross axis is HORIZONTAL
     * row → Cross axis is VERTICAL

2. FLEX DIRECTION:
   ---------------
   - 'column' (default): Stack children vertically (↓)
   - 'row': Stack children horizontally (→)
   - 'column-reverse': Stack vertically upward (↑)
   - 'row-reverse': Stack horizontally backward (←)

3. JUSTIFY CONTENT (Main Axis):
   ----------------------------
   Controls how items are distributed along MAIN axis
   
   - 'flex-start': Pack items at start
   - 'flex-end': Pack items at end
   - 'center': Center items
   - 'space-between': First/last at edges, equal space between
   - 'space-around': Equal space around each item
   - 'space-evenly': Equal space everywhere (including edges)

4. ALIGN ITEMS (Cross Axis):
   -------------------------
   Controls how items are aligned along CROSS axis
   
   - 'stretch' (default): Stretch to fill container
   - 'flex-start': Align to start of cross axis
   - 'flex-end': Align to end of cross axis
   - 'center': Center on cross axis
   - 'baseline': Align text baselines

5. FLEX PROPERTY:
   --------------
   - flex: 0 → Don't grow or shrink (use explicit size)
   - flex: 1 → Take 1 part of available space
   - flex: 2 → Take 2 parts of available space
   
   Example: If three items have flex: 1, 2, 1
   Total = 4 parts → Item takes 1/4, 2/4, 1/4 of space
   */
