import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Image, ActivityIndicator } from "react-native";
import Colors from "./colors";

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false
    };
  }

  render() {
    const { loading } = this.state;
    const { isLoading } = this.props;

    return (
      <View
        style={[
          styles.container,
          {
            width: this.props.size,
            height: this.props.size,
            borderRadius: this.props.size / 2,
            backgroundColor:
              !this.props.source || this.state.error
                ? Colors[this.props.letter.toUpperCase()] || "rgba(0,0,0,0.1)"
                : "rgba(0,0,0,0.1)"
          },
          this.props.style
        ]}
      >
        {
          isLoading ? (
            <ActivityIndicator size="large" color="#333" />
          ) : !this.props.source || this.state.error ? (
            <Text style={[styles.letter, { fontSize: this.props.size / 2 }]}>
              {this.props.letter}
            </Text>
          ) : (
            <Image
              style={styles.photo}
              source={this.props.source}
              onLoadEnd={() => this.setState({ loading: false })}
              onError={() => this.setState({ error: true })}
            />
          )
        }
      </View>
    );
  }
}

Avatar.propTypes = {
  size: PropTypes.number.isRequired,
  letter: PropTypes.string.isRequired,
  source: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  },
  photo: {
    width: "100%",
    height: "100%"
  },
  letter: {
    color: "rgba(255,255,255,0.75)",
    position: "absolute",
    textAlign: "center",
    fontWeight: "600"
  }
});
