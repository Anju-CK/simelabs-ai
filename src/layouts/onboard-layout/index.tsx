import React from "react";
import styles from "./Onboardinglayout.module.css";
type OnBoardingProps = {
  children: JSX.Element;
};
export default function OnboardingLayout({ children }: OnBoardingProps) {
  return (
    <div className={styles.defaultlayout}>
      <div className={styles.leftlayout}>Simelabs AI</div>
      <div className={styles.rightlayout}>{children}</div>
    </div>
  );
}
