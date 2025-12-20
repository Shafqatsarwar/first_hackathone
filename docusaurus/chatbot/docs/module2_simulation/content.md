# Module 2: The Digital Twin (Gazebo & Unity)

## Overview
In this module, we'll explore simulation platforms that serve as digital twins for physical robots. We'll focus on Gazebo for physics simulation and briefly touch on Unity for high-fidelity rendering and human-robot interaction.

## Learning Objectives
- Understand physics simulation principles for robotics
- Create realistic simulation environments in Gazebo
- Integrate sensor models into simulation
- Validate robot behaviors in simulation before real-world deployment

## 1. Physics Simulation Fundamentals

A digital twin is a virtual representation of a physical system that mirrors the real-world system's behaviors, properties, and responses. In robotics, physics simulation is crucial for:

1. **Testing**: Validate robot behaviors without risk to hardware
2. **Training**: Train AI models in safe, controllable environments
3. **Development**: Prototype and refine algorithms before deployment
4. **Debugging**: Isolate and resolve issues in a controllable setting

### Key Physics Concepts in Simulation
- **Rigid Body Dynamics**: How objects move and interact with each other
- **Collision Detection**: Identifying when objects come into contact
- **Contact Physics**: How objects respond to contact (friction, restitution)
- **Sensors Simulation**: Replicating the behavior of real sensors

## 2. Gazebo Simulation Platform

Gazebo is a 3D dynamic simulator with the ability to accurately and efficiently simulate populations of robots in complex indoor and outdoor environments.

### Core Components
1. **Gazebo Server**: Handles physics simulation and provides services
2. **Gazebo Client**: Provides GUI for visualization and control
3. **Model Database**: Collection of pre-built robot and environment models
4. **Sensor Plugins**: Simulate various types of sensors (LiDAR, cameras, IMU, etc.)

### Gazebo World Format (.world)
Gazebo worlds are defined in XML format:

```xml
<?xml version="1.0" ?>
<sdf version="1.6">
  <world name="default">
    <light name="sun" type="directional">
      <cast_shadows>true</cast_shadows>
      <pose>0 0 10 0 0 0</pose>
      <diffuse>0.8 0.8 0.8 1</diffuse>
      <specular>0.2 0.2 0.2 1</specular>
      <attenuation>
        <range>1000</range>
        <constant>0.9</constant>
        <linear>0.01</linear>
        <quadratic>0.001</quadratic>
      </attenuation>
      <direction>-0.6 -0.4 -0.8</direction>
    </light>
    
    <model name="ground_plane">
      <static>true</static>
      <link name="link">
        <collision name="collision">
          <geometry>
            <plane>
              <normal>0 0 1</normal>
            </plane>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <plane>
              <normal>0 0 1</normal>
              <size>100 100</size>
            </plane>
          </geometry>
          <material>
            <ambient>0.8 0.8 0.8 1</ambient>
            <diffuse>0.8 0.8 0.8 1</diffuse>
            <specular>0.8 0.8 0.8 1</specular>
          </material>
        </visual>
      </link>
    </model>
    
    <!-- Additional models would go here -->
    
  </world>
</sdf>
```

## 3. Sensor Simulation

Realistic sensor simulation is critical for developing and testing robot systems. Common sensors in robotics simulation include:

### 3.1 LiDAR Simulation
LiDAR (Light Detection and Ranging) sensors are simulated by casting rays and measuring distances to objects:

```xml
<sensor name="lidar_sensor" type="ray">
  <pose>0.1 0 0.1 0 0 0</pose>
  <ray>
    <scan>
      <horizontal>
        <samples>360</samples>
        <resolution>1</resolution>
        <min_angle>-3.14159</min_angle>
        <max_angle>3.14159</max_angle>
      </horizontal>
    </scan>
    <range>
      <min>0.1</min>
      <max>30</max>
      <resolution>0.01</resolution>
    </range>
  </ray>
  <plugin name="lidar_controller" filename="libgazebo_ros_ray_sensor.so">
    <ros>
      <namespace>laser</namespace>
      <remapping>~/out:=scan</remapping>
    </ros>
    <output_type>sensor_msgs/LaserScan</output_type>
  </plugin>
</sensor>
```

### 3.2 Depth Camera Simulation
Depth cameras provide both RGB and depth information:

```xml
<sensor name="depth_camera" type="depth">
  <pose>0 0 0 0 0 0</pose>
  <camera>
    <horizontal_fov>1.047</horizontal_fov>
    <image>
      <width>640</width>
      <height>480</height>
      <format>R8G8B8</format>
    </image>
    <clip>
      <near>0.1</near>
      <far>10</far>
    </clip>
  </camera>
  <always_on>true</always_on>
  <update_rate>30</update_rate>
  <visualize>true</visualize>
</sensor>
```

### 3.3 IMU Simulation
Inertial Measurement Units measure acceleration and angular velocity:

```xml
<sensor name="imu_sensor" type="imu">
  <always_on>true</always_on>
  <update_rate>100</update_rate>
  <plugin filename="libgazebo_ros_imu_sensor.so" name="imu_plugin">
    <ros>
      <namespace>imu</namespace>
      <remapping>~/out:=imu/data</remapping>
    </ros>
    <initial_orientation_as_reference>false</initial_orientation_as_reference>
  </plugin>
</sensor>
```

## 4. Integrating with ROS 2

Gazebo integrates seamlessly with ROS 2 through Gazebo ROS packages:

### Launching a Robot in Gazebo
```python
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node
from launch.actions import IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource
from ament_index_python.packages import get_package_share_directory
import os

def generate_launch_description():
    # Launch Arguments
    use_sim_time = LaunchConfiguration('use_sim_time', default='true')

    # Get URDF via xacro
    robot_description_content = open(
        os.path.join(get_package_share_directory('my_robot_description'), 'urdf', 'my_robot.urdf')
    ).read()
    
    robot_state_publisher_node = Node(
        package='robot_state_publisher',
        executable='robot_state_publisher',
        name='robot_state_publisher',
        parameters=[{'use_sim_time': use_sim_time, 'robot_description': robot_description_content}]
    )

    # Gazebo Sim
    gazebo = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(
            os.path.join(get_package_share_directory('gazebo_ros'), 'launch', 'gazebo.launch.py'),
        )
    )

    spawn_entity = Node(
        package='gazebo_ros',
        executable='spawn_entity.py',
        arguments=['-topic', 'robot_description', '-entity', 'my_robot'],
        output='screen'
    )

    return LaunchDescription([
        DeclareLaunchArgument('use_sim_time', default_value='true'),
        gazebo,
        robot_state_publisher_node,
        spawn_entity
    ])
```

## 5. Practical Exercise: Creating a Custom Gazebo Environment

In this exercise, you'll create a custom Gazebo environment with physics properties and sensor-equipped objects.

### Prerequisites:
- Completed Module 1 (ROS 2)
- Docker environment with Gazebo installed

### Steps:
1. Navigate to the module directory: `cd /workspace/modules/module2_simulation`
2. Create a new world file with custom physics properties
3. Design sensor-equipped objects
4. Simulate a humanoid robot navigating the environment

### Sample World File:
[custom_world.world content would go here in the actual implementation]

## 6. Unity for High-Fidelity Rendering (Overview)

While Gazebo excels at physics simulation, Unity provides high-fidelity rendering and human-robot interaction capabilities. Unity's robotics simulation tools include:

1. **Synthetic Data Generation**: Create large datasets for training AI models
2. **Perception Simulation**: Accurate simulation of cameras, LiDAR, and other sensors
3. **Human-in-the-Loop Simulation**: Test human-robot interaction scenarios
4. **VR/AR Integration**: Design immersive training environments

## 7. Summary

This module covered the fundamentals of physics simulation for robotics, focusing on Gazebo for creating digital twins of physical robots. You learned about simulating physics, gravity, collisions, and various sensors. You also gained exposure to Unity's capabilities for high-fidelity rendering.

In the next module, we'll explore NVIDIA Isaac, which provides advanced perception and training capabilities for robotics applications, with special emphasis on hardware-accelerated processing.